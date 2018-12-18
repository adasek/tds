'use strict'
import Soldier from './objects/soldier';

class World {

    constructor(aspectRatio) {
        this.height = 1000;
        this.width = 1000 * aspectRatio;

        //player, gun, bullets, enemies...
        this.gameObjects = [];

        this.populate();


        //create player
        this.player = new Soldier({x: 300, y: 100, speed: 10, rotation: Math.pi * 3 / 4});
        this.gameObjects.push(this.player);
    }

    populate() {
        //create something 
        var soldier1 = new Soldier({x: 150, y: 200, speed: 10, rotation: Math.pi * 3 / 4});
        this.gameObjects.push(soldier1);
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
}

export default World;