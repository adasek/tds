'use strict'
import Soldier from './objects/soldier';
import ProjectileFactory from './projectile_factory';

class World {

    constructor(aspectRatio) {
        this.height = 1000;
        this.width = 1000 * aspectRatio;

        //player, gun, bullets, enemies...
        this.gameObjects = [];

        this.populate();


        //create player
        this.player = new Soldier({
            x: 300,
            y: 100, 
            speed: 0, 
            rotation: Math.pi * 3 / 4,
            projectileFactory:this.createProjectileFactory()
        
        });
        this.attach(this.player);
    }

    populate() {
        //create something 
        var soldier1 = new Soldier({x: 150, y: 200, color:'red', speed: 0.01, rotation: Math.pi * 3 / 4});
        this.attach(soldier1)
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
    }
    
    createProjectileFactory(){
        return new ProjectileFactory({world:this});
    }
    
    attach(worldObject){
        worldObject.on('destroy', function(_worldObject) {
            //todo: instead of array use object
            var index = this.gameObjects.indexOf(_worldObject);
            if (index > -1) {
              this.gameObjects.splice(index, 1);
            }
        }.bind(this,worldObject));

        this.gameObjects.push(worldObject);
    }
}

export default World;