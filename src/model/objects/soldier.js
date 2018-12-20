'use strict'
import WorldObject from './world_object';
import Circle from '../shapes/circle';
import Gun from '../gun';

class Soldier extends WorldObject {
    constructor(opts) {
        opts.shape = opts.shape || new Circle({radius: 10});
        opts.color = opts.color || 'green';
        opts.frictionForward  = opts.frictionForward || 0.008;
        opts.frictionSide  = opts.frictionSide || 0.0004;
        opts.projectileFactory  = opts.projectileFactory ||null;
        super(opts);
        
        this.gun = new Gun({owner:this,projectileFactory:opts.projectileFactory});
        
    }
}

export default Soldier;