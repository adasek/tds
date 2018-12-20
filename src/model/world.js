'use strict'
import Soldier from './objects/soldier';
import Player from './objects/player';
import ProjectileFactory from './projectile_factory';

class World {

    constructor(aspectRatio) {
        this.height = 600;
        this.width = 600 * aspectRatio;
        this.maxPopulationNumber = 20;
        this.populationNumber = 0;

        //player, gun, bullets, enemies...
        this.gameObjects = [];

        this.populate();

        this.tickCounter = 0;

        this.score = 0;

        //create player
        this.player = new Player({
            x: 300,
            y: 100,
            speed: 0,
            rotation: Math.pi * 3 / 4,
            projectileFactory: this.createProjectileFactory()

        });
        this.attach(this.player);
    }

    populate() {
        //create something 
        for (; this.populationNumber < this.maxPopulationNumber; ) {
            var soldier = new Soldier({x: Math.random() * this.width, y: Math.random() * this.height, color: 'red', speedForward: 0.1, rotation: Math.random() * Math.PI * 3 / 4});
            soldier.on('destroy', function () {
                this.populationNumber--;
            }.bind(this));
            this.populationNumber++;
            this.attach(soldier);
        }
    }

    solveCollisions() {
        for (var i = 0; i < this.gameObjects.length; i++) {
            for (var n = 0; n < i - 1; n++) {
                if (this.gameObjects[i].collidesWith(this.gameObjects[n])) {
                    if (this.gameObjects[i].type === "projectile" || this.gameObjects[n].type === "projectile") {
                        //one of objects is projectile, destroy objects
                        if (this.gameObjects[i].owner === this.gameObjects[n] || this.gameObjects[n].owner === this.gameObjects[i]) {
                            //self inflicted damage does not count
                            continue;
                        }
                        this.gameObjects[i].destroy();
                        this.gameObjects[n].destroy();
                    }
                }
            }
        }
    }

    /**
     * Recalculate position of game objects
     * @param {int} elapsedTime
     * @returns {undefined}
     */
    tick(elapsedTime) {
        if (typeof (elapsedTime) !== "number" || Number.isNaN(elapsedTime)) {
            console.error("Tick with no elapsedNumber");
        }
        if (elapsedTime <= 0) {
            console.error("Tick elapsedTime " + elapsedTime);
        }

        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].tick(elapsedTime);
        }

        if ((this.tickCounter++) % 100 === 0) {
            this.populate();
        }

        this.solveCollisions();

    }

    createProjectileFactory() {
        return new ProjectileFactory({world: this});
    }

    attach(worldObject) {
        worldObject.on('destroy', function (_worldObject) {
            //todo: instead of array use object
            var index = this.gameObjects.indexOf(_worldObject);
            if (index > -1) {
                this.gameObjects.splice(index, 1);
            }

            if (_worldObject.type === "soldier") {
                this.score++;
                document.getElementById('score').innerHTML = this.score;
            }
        }.bind(this, worldObject));

        worldObject.worldTransform = this.transformCoordinates();
        this.gameObjects.push(worldObject);
    }

    /**
     * 
     * @returns {undefined}
     */
    transformCoordinates() {
        var world = this;
        return function (object) {
            var shifted = false;
            while (object.x > world.width) {
                object.x -= world.width;
                shifted = true;
            }
            while (object.y > world.height) {
                object.y -= world.height;
                shifted = true;
            }
            while (object.x < 0) {
                object.x += world.world;
                shifted = true;
            }
            while (this.y < 0) {
                object.y += world.height;
                shifted = true;
            }
            if (object.type === "projectile" && shifted) {
                object.destroy();
            }
            return object;
        };
    }

    saveMemento() {
        return JSON.stringify({
            "score": this.score,
            "player": this.player
        });
        //,
        //    "worldObjects": this.worldObjects

    }

    loadMemento(json) {
        //todo: cleanup 
        console.log("loadMemento");

        var loadObject = JSON.parse(json);
        console.log(loadObject.player);
        for (var key in loadObject.player) {
            this.player[key] = loadObject.player[key];
        }
        console.log("player");
        console.log(this.player);

        this.score = loadObject.score;
        //this.worldObjects = loadObject.worldObjects;

    }

}

export default World;