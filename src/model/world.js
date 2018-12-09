'use strict'

class World {

    constructor(aspectRatio) {
        this.height = 1000;
        this.width = 1000* aspectRatio;
        
        //player, gun, bullets, enemies...
        this.gameObjects = [];
    }
    
    
    
}


export { World };