'use strict'

class Soldier extends WorldObject {
    constructor(opts) {
        opts.x = opts.x || 0;
        opts.y = opts.y || 0;
        opts.rotation = opts.rotation || 0;
        opts.shape = opts.shape || new Circle({radius: 10});
        opts.color = opts.color || 'green';

        super(opts);
    }
}

module.exports = Soldier;