/**
 * Common class for game objects that have some place
 * and size in the game World 
 * @type type
 */

'use strict'

class WorldObject {

    constructor(opts) {
        this.x = opts.x;
        this.y = opts.y;
        this.shape = opts.shape ? opts.shape : new Point();
    }

}


export { World };