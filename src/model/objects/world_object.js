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
        this.currentTime = opts.currentTime || new Date();

        this.rotationChange = new PhysicalProperty({
            "max": Math.PI / 1000, //maximum per 1ms
            "min": -Math.PI / 1000,
            "default": 0,
            "increaseSlopePositive": 10 * Math.PI / 1000, //increase per 1ms, from default to max
            "decreaseSlopePositive": 100 * Math.PI / 1000, //decrease 1ms, from max to default
            "decreaseSlopeNegative": 10 * Math.PI / 1000, //decrease 1ms, from default to min 
            "increaseSlopeNegative": 100 * Math.PI / 1000  //increase per 1ms, from min to default
        });

        this.speedForwardChange = new PhysicalProperty({
            "max": 10 / 1000, //maximum per 1ms
            "min": -5 / 1000,
            "default": 0,
            "increaseSlopePositive": 10 / 1000,
            "decreaseSlopePositive": 10 / 1000,
            "decreaseSlopeNegative": 10 / 1000,
            "increaseSlopeNegative": 10 / 1000
        });
        this.speedSideChange = new PhysicalProperty({
            "max": 1 / 1000, //maximum per 1ms
            "min": -1 / 1000,
            "default": 0,
            "increaseSlopePositive": 1 / 1000,
            "decreaseSlopePositive": 1 / 1000,
            "decreaseSlopeNegative": 1 / 1000,
            "increaseSlopeNegative": 1 / 1000
        });

        this.speedForward=0;
        this.speedSide=0;

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

        this.rotationAngle = (-this.rotation) * 180 / Math.PI + "deg";

        this.speedForward += this.speedForwardChange.valueAt(this.currentTime);
        this.speedSide += this.speedSideChange.valueAt(this.currentTime);
        
        function applyFriction(value,friction){
            if (value > 0) {
            value -= friction;
            if (value < 0) {
                value = 0;
            }
        } else if (value < 0) {
            value += friction;
            if (value > 0) {
                value = 0;
            }
        }
        return value;
        }
        
        // apply friction
        this.speedForward = applyFriction(this.speedForward,0.001);
        this.speedSide = applyFriction(this.speedSide,0.0001);
        

        // apply speed in the vector of rotation
        this.x += Math.cos(this.rotation) * this.speedForward * elapsedTime;
        this.y -= Math.sin(this.rotation) * this.speedForward * elapsedTime;
        // apply side speed - in the normal vector
        
        this.x += Math.cos(this.rotation+Math.PI/2) * this.speedSide * elapsedTime;
        this.y -= Math.sin(this.rotation+Math.PI/2) * this.speedSide * elapsedTime;
        
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

    beginIncreasingSpeedForward(opts) {
        this.speedForwardChange.beginIncreasing(opts);
    }
    endIncreasingSpeedForward(opts) {
        this.speedForwardChange.endIncreasing(opts);
    }
    beginDecreasingSpeedForward(opts) {
        this.speedForwardChange.beginDecreasing(opts);
    }
    endDecreasingSpeedForward(opts) {
        this.speedForwardChange.endDecreasing(opts);
    }
    
    beginIncreasingSpeedSide(opts) {
        this.speedSideChange.beginIncreasing(opts);
    }
    endIncreasingSpeedSide(opts) {
        this.speedSideChange.endIncreasing(opts);
    }
    beginDecreasingSpeedSide(opts) {
        this.speedSideChange.beginDecreasing(opts);
    }
    endDecreasingSpeedSide(opts) {
        this.speedSideChange.endDecreasing(opts);
    }
}
WorldObject.id = 0;

export default WorldObject;