/**
 * Common class for game objects that have some place
 * and size in the game World 
 * @type type
 */

'use strict'

class Gun {

    constructor(opts) {
        this.preparingTime = null;
    }
    
    shootPrepare(opts){
        console.log("Prep");
        console.log(opts);
        this.preparingTime = opts.time;
        
    }
    shootPerform(opts){
        console.log("Bang");
        opts.time - this.preparingTime;
        
    }
    
    /**
     * 
     * @param {type} opts
     * @return {undefined}
     */
    getAccuracyAngle(opts){
        if(this.preparingTime===null){
            return null; //no shooting in progress
        }
        //accuracy from 0 to 1
        var accuracy = min(1,opts.time - this.preparingTime);
        var accuracyAngle = (1.1-accuracy)*(Math.PI/6);
        return accuracyAngle;
    }
    
}

export default Gun;