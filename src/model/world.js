'use strict'
import Soldier from './objects/soldier';

class World {

    constructor(aspectRatio) {
        this.height = 1000;
        this.width = 1000 * aspectRatio;

        //player, gun, bullets, enemies...
        this.gameObjects = [];

        this.populate();
    }

    populate() {
        //create something 
        this.gameObjects.push(new Soldier({x: 150, y: 200}));

    }

    /**
     * Recalculate position of game objects
     * @param {int} elapsedTime
     * @returns {undefined}
     */
    tick(elapsedTime) {
        for (var i = 0; i < this.gameObjects; i++) {
            this.gameObjects[i].tick(elapsedTime);
        }
    }
}

export default World;