'use strict'
import Soldier from './soldier';

class Player extends Soldier {
    constructor(opts) {
        opts.frictionForward  = opts.frictionForward || 0.008;
        opts.frictionSide  = opts.frictionSide || 0.0005;
        super(opts);
        this.type = "player";
    }
}

export default Player;