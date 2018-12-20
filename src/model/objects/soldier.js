'use strict'
import WorldObject from './world_object';
import Circle from '../shapes/circle';
import Gun from '../gun';

class Soldier extends WorldObject {
    constructor(opts) {
        opts.shape = opts.shape || new Circle({radius: 10});
        opts.color = opts.color || 'red';
        opts.frictionForward  = opts.frictionForward || 0;
        console.log(opts.frictionForward);
        opts.frictionSide  = opts.frictionSide || 0.0005;
        opts.projectileFactory  = opts.projectileFactory ||null;
        super(opts);
        
        this.type="soldier";
        this.gun = new Gun({owner:this,projectileFactory:opts.projectileFactory});
        
    }
}

export default Soldier;