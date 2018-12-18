/**
 * Common class for game objects that have some place
 * and size in the game World 
 * @type type
 */

'use strict'

import PhysicalProperty from '../physical_property';

class WorldObject {

    constructor(opts) {
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        this.shape = opts.shape ? opts.shape : new Point();
        this.rotation = opts.rotation || 0; //in rads, starting orientation to the right ->
        this.speed = opts.speed || 0;
        this.color = opts.color || 'red';
        this.speedChange = opts.speedChange || 0; //differential of speed
        this.currentTime = opts.currentTime || new Date();

        this.rotationChange = new PhysicalProperty({
            "max": Math.PI * 2 / 1000, //maximum per 1ms
            "min": -Math.PI * 2 / 1000,
            "default": 0,
            "increaseSlopePositive": 10 * Math.PI / 1000, //increase per 1ms, from default to max
            "decreaseSlopePositive": 100 * Math.PI / 1000, //decrease 1ms, from max to default
            "decreaseSlopeNegative": 10 * Math.PI / 1000, //decrease 1ms, from default to min 
            "increaseSlopeNegative": 100 * Math.PI / 1000  //increase per 1ms, from min to default
        });
        this.id = WorldObject.id++;
    }

    /**
     * Compute my new position based on some ms elapsed
     * @param {integer} elapsedTime in miliseconds
     * @returns {undefined}
     */
    tick(elapsedTime) {
        var newTime = new Date(this.currentTime.getTime() + elapsedTime);

        if (typeof (elapsedTime) !== "number" || Number.isNaN(elapsedTime)) {
            throw "elapsedTime";
        }
        if (typeof (this.rotation) !== "number" || Number.isNaN(this.rotation)) {
            throw "this.rotation";
        }
        //diff:
        //this.rotation.valueSum(this.currentTime, newTime)
        this.rotation += this.rotationChange.valueAt(this.currentTime) * elapsedTime;
        if (typeof (this.rotation) !== "number" || Number.isNaN(this.rotation)) {
            console.error("cha=" + this.rotationChange.valueAt(this.currentTime));
            console.error("elapsedTime=" + elapsedTime);
            throw "this.rotationB";
        }

        this.rotationAngle = this.rotation * 180 / Math.PI + "deg";

        // apply speed in the vector of rotation
        //this.x += Math.sin(this.rotation.value) * this.speed * elapsedTime;
        //this.y += Math.cos(this.rotation.value) * this.speed * elapsedTime;

        this.currentTime = newTime;
    }

    beginIncreasingRotation(opts) {
        this.rotationChange.beginIncreasing(opts);
    }
    endIncreasingRotation(opts) {
        this.rotationChange.endIncreasing(opts);
    }
    beginDecreasingRotation(opts) {
        this.rotationChange.beginDecreasing(opts);
    }
    endDecreasingRotation(opts) {
        this.rotationChange.endDecreasing(opts);
    }

}
WorldObject.id = 0;

export default WorldObject;