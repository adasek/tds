/**
 * Common class for game objects that have some place
 * and size in the game World 
 * @type type
 */

'use strict'

import WorldObject from './objects/world_object';
import Projectile from './objects/projectile';

class Gun extends WorldObject {

    constructor(opts) {
        opts = opts || {};
        super(opts);
        this.preparingTime = null;
        this.owner = opts.owner;
        this.projectileFactory = opts.projectileFactory;

        this.weaponTypes = Object.freeze({"SINGLE": 0, "SHOTGUN": 1});
        this.weaponType = this.weaponTypes["SINGLE"];
    }

    toggle(opts) {
        this.weaponType = (this.weaponType + 1) % Object.keys(this.weaponTypes).length;
    }

    shootPrepare(opts) {
        this.target = {x: opts.positionX, y: opts.positionY};
        if (!opts.time) {
            throw "Should provide time";
        }
        this.preparingTime = opts.time;
    }

    shootPerform(opts) {
        var accuracy = this.getAccuracy({});
        //create projectile
        var projectile = this.projectileFactory.create({
            projectileType: this.weaponType,
            x: this.owner.x,
            y: this.owner.y,
            owner: this.owner, //prevent self inflicted damage
            accuracy: accuracy,
            angle: this.owner.angleTo(this.target)
        });

        this.target = null;
        this.preparingTime = null;
    }

    /**
     * 
     * @param {type} opts
     * @return {undefined}
     */
    getAccuracyAngle(opts) {
        if (this.preparingTime === null) {
            return null; //no shooting in progress
        }

        //accuracy from 0 to 1
        var accuracyAngle = (1.1 - this.getAccuracy(opts)) * (Math.PI / 6);
        return accuracyAngle;
    }

    getAccuracy(opts) {
        var time = opts.time || new Date();
        return Math.min(1, (time - this.preparingTime) / 1000);
    }

}

export default Gun;