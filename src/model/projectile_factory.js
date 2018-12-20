/**
 * Common class for game objects that have some place
 * and size in the game World 
 * @type type
 */

'use strict'

import World from './world';
import Projectile from './objects/projectile';

class ProjectileFactory {

    constructor(opts) {
        this.world = opts.world;
    }
    
    create(opts){
        //mode?
        
        var projectile = new Projectile(opts);
        this.world.attach(projectile);
        
    }
    
}

export default ProjectileFactory;