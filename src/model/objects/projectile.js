/**
 * Common class for game objects that have some place
 * and size in the game World 
 * @type type
 */

'use strict'

import WorldObject from './world_object';
import Circle from '../shapes/circle';

class Projectile extends WorldObject {

    constructor(opts) {
        opts = opts || {};
        opts.shape = opts.shape || new Circle({radius: 2});
        opts.color = opts.color || 'black';
        opts.speedForward = opts.speedForward || 0.2;
        opts.speedSide = opts.speedSide || 0;
        super(opts);

        
        this.type = "projectile";
    }

}

export default Projectile;