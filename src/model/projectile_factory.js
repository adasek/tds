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
        var shootErr = this.determineShootErr(opts.accuracy);

        if (opts.projectileType === 0) {
            this.createOneProjectile(opts, opts.angle, shootErr);
        } else if (opts.projectileType === 1) {
            this.createOneProjectile(opts, opts.angle + Math.PI / 8, shootErr);
            this.createOneProjectile(opts, opts.angle, shootErr);
            this.createOneProjectile(opts, opts.angle - Math.PI / 8, shootErr);

        } else {
            throw "Weapon not implemented";

        }
    }

    determineShootErr(accuracy) {
        var shootErr = (Math.random() * (1 - accuracy)) / 2;
        if (Math.random() > 0.5) {
            shootErr = -shootErr;
        }
        return shootErr;
    }

    createOneProjectile(opts, angle, shootErr) {
        //apply accuracy
        //random error in shooting

        //max error is 1/4 to each side
        //max err is 0.5
        angle += shootErr;

        var projectile = new Projectile({
            x: opts.x,
            y: opts.y,
            rotation: angle,
            owner: opts.owner
        });
        this.world.attach(projectile);
    }
}

export default ProjectileFactory;