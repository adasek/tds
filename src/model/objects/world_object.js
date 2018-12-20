/**
 * Common class for game objects that have some place
 * and size in the game World 
 * @type type
 */

'use strict'

import PhysicalProperty from '../physical_property';
import Circle from '../shapes/circle';
var EventEmitter = require('event-emitter-es6');
class WorldObject extends EventEmitter {

    constructor(opts) {
        super();
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        this.previousX = this.x;
        this.previousY = this.y;
        this.shape = opts.shape ? opts.shape : new Circle({radius: 5});
        this.rotation = opts.rotation || 0; //in rads, starting orientation to the right ->
        this.color = opts.color || 'red';
        this.currentTime = opts.currentTime || new Date();
        this.frictionForward = opts.frictionForward || 0;
        this.frictionSide = opts.frictionSide || 0;
        this.owner = opts.owner || null;
        this.worldTransform = opts.worldTransform || function (obj) {
            return obj;
        };
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
        this.speedForward = opts.speedForward || 0;
        this.speedSide = opts.speedSide || 0;
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


        this.speedForward += this.speedForwardChange.valueAt(this.currentTime);
        this.speedSide += this.speedSideChange.valueAt(this.currentTime);
        function applyFriction(value, friction) {
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
        this.speedForward = applyFriction(this.speedForward, this.frictionForward);
        this.speedSide = applyFriction(this.speedSide, this.frictionSide);
        this.previousX = this.x;
        this.previousY = this.y;
        // apply speed in the vector of rotation
        this.x += Math.cos(this.rotation) * this.speedForward * elapsedTime;
        this.y += Math.sin(this.rotation) * this.speedForward * elapsedTime;
        // apply side speed - in the normal vector

        this.x += Math.cos(this.rotation + Math.PI / 2) * this.speedSide * elapsedTime;
        this.y += Math.sin(this.rotation + Math.PI / 2) * this.speedSide * elapsedTime;
        this.worldTransform(this);
        if (this.destroyed) {
            this.x = this.previousX;
            this.y = this.previousY;
        }

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

    beginShoot(opts) {
        opts.time = opts.time || new Date();
        if (typeof (this.gun) === "object" && this.gun !== null && typeof (this.gun.shootPrepare) === "function") {
            this.gun.shootPrepare(opts);
        }
    }
    endShoot(opts) {
        opts.time = opts.time || new Date();
        if (typeof (this.gun) === "object" && this.gun !== null && typeof (this.gun.shootPerform) === "function") {
            this.gun.shootPerform(opts);
        }
    }

    toggleWeapon(opts) {
        opts.time = opts.time || new Date();
        if (typeof (this.gun) === "object" && this.gun !== null && typeof (this.gun.toggle) === "function") {
            this.gun.toggle(opts);
        }
    }

    angleTo(target) {
        var angle = 0;
        if (target.y >= this.y) {
            //first and second quadrant
            angle = Math.acos((target.x - this.x) / this.distanceTo(target));
        } else {
            //second and third quadrant
            angle = 2 * Math.PI - Math.acos((target.x - this.x) / this.distanceTo(target));
        }
        return angle;
    }

    distanceTo(target) {
        return Math.sqrt((this.x - target.x) * (this.x - target.x) + (this.y - target.y) * (this.y - target.y));
    }

    destroy(noScore) {
        this.destroyed = true;
        if (noScore) {
            this.noScore = true;
        }
        this.emit('destroy');
    }

    toJSON() {
        return {
            x: this.x,
            y: this.y,
            previousX: this.previousX,
            previousY: this.previousY,
            rotation: this.rotation,
            color: this.color,
            frictionForward: this.frictionForward,
            frictionSide: this.frictionSide,
            speedForward: this.speedForward,
            speedSide: this.speedSide,
            id: this.id
                    /*
                     shape: this.shape,
                     currentTime: this.currentTime,
                     owner:this.owner.id,
                     rotationChange:this.rotationChange,
                     speedForwardChange:this.speedForwardChange,
                     speedSideChange:this.speedSideChange
                     */
        };
    }

    collidesWith(obj) {
        if (this.destroyed) {
            return;
        }

        if (this.shape.type === "circle" && obj.shape.type === "circle") {
            var dist = this.distanceTo(obj);
            //TODO: the paths crossed:

            if (this.type === "projectile" || obj.type === "projectile") {
//high speed
                var projectile = this.type === "projectile" ? this : obj;
                var stationary = this.type === "projectile" ? obj : this;
                //https://brilliant.org/wiki/dot-product-distance-between-point-and-a-line/
                var vect = {x: projectile.x - projectile.previousX, y: (projectile.y - projectile.previousY)};
                //normalovy vektor
                var a = vect.y;
                var b = -vect.x;
                var c = -a * projectile.x - b * projectile.y;
                //check if we are in between projectile.x,projectile.previousX (line is bounded!)

                var vTarget1 = {x: projectile.previousX - obj.x, y: projectile.previousY - obj.y};
                var vTarget2 = {x: projectile.x - obj.x, y: projectile.y - obj.y};
                if (((vTarget2.y * vTarget1.y + vTarget2.x - vTarget1.x)) / Math.sqrt(Math.pow(vTarget2.x - vTarget1.x, 2) + Math.pow(vTarget2.y - vTarget1.y, 2)) < 0) {
//cross product is negative

//dist from line is relevant
                    dist = Math.abs(a * stationary.x + b * stationary.y + c) / Math.sqrt(a * a + b * b);
                }

            }
            return (dist < (this.shape.radius + obj.shape.radius));
        } else {
            throw "Collision of shapes not yet implemented";
        }
        return false;
    }
}
WorldObject.id = 0;
export default WorldObject;