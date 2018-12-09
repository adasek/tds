'use strict'

class Player extends Soldier {
    constructor(opts) {
        opts.x = opts.x || 0;
        opts.y = opts.y || 0;
        opts.rotation = opts.rotation || 0;
        super(opts);
    }
}

module.exports = Player;