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

    create(opts) {
        //mode?

        //apply accuracy
        var angle = opts.angle;
        //random error in shooting

        //max error is 1/4 to each side
        //max err is 0.5
        var shootErr = (Math.random() * (1 - opts.accuracy)) / 2;
        if (Math.random() > 0.5) {
            shootErr = -shootErr;
        }
        console.log(opts.accuracy + "=>" + shootErr);
        angle += shootErr;

        var projectile = new Projectile({
            x: opts.x,
            y: opts.y,
            rotation: angle
        });
        this.world.attach(projectile);



    }

}

export default ProjectileFactory;