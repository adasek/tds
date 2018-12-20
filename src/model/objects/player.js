'use strict'
import Soldier from './soldier';

class Player extends Soldier {
    constructor(opts) {
        opts.frictionForward  = 0.008;
        opts.frictionSide  = 0.0005;
        opts.color = "green";
        super(opts);
        this.type = "player";
    }
}

export default Player;