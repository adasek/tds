/**
 * Common class for game objects that have some place
 * and size in the game World 
 * @type type
 */

'use strict'

class WorldObject {

    constructor(opts) {
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        this.shape = opts.shape ? opts.shape : new Point();
        this.rotation = opts.rotation || 0; //in rads, starting orientation to the right ->
        this.rotationChange = opts.rotationChange || 0; //differential of rotation
        this.speed = opts.speed || 0;
        this.color = opts.color || 'red';
        this.speedChange = opts.speedChange || 0; //differential of speed

        this.id = WorldObject.id++;
    }

    /**
     * Compute my new position based on some ms elapsed
     * @param {integer} elapsedTime in miliseconds
     * @returns {undefined}
     */
    tick(elapsedTime) {
        // apply speed in the vector of rotation
        this.x += Math.sin(this.rotation) * this.speed * elapsedTime;
        this.y += Math.cos(this.rotation) * this.speed * elapsedTime;

        // new rotation
        this.rotation = this.rotation + this.rotationChange;

    }

}
WorldObject.id = 0;

export default WorldObject;