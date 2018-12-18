'use strict'
import WorldObject from './world_object';
import Circle from '../shapes/circle';

class Soldier extends WorldObject {
    constructor(opts) {
        opts.shape = opts.shape || new Circle({radius: 10});
        opts.color = opts.color || 'green';

        super(opts);
    }
}

export default Soldier;