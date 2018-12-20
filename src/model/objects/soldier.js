'use strict'
import WorldObject from './world_object';
import Circle from '../shapes/circle';
import Gun from '../gun';

class Soldier extends WorldObject {
    constructor(opts) {
        opts.shape = opts.shape || new Circle({radius: 10});
        opts.color = opts.color || 'green';
        super(opts);
        
        this.gun = new Gun({owner:this});
        
    }
}

export default Soldier;