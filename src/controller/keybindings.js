'use strict'

class KeyBindings {
    constructor(subject,gameArea) {
        //Binding
        window.onkeydown = (function (event) {
            this.keyDown(event);
        }).bind(this);

        window.onkeyup = (function (event) {
            this.keyUp(event);
        }).bind(this);

        gameArea.onmousedown = (function (event) {
            this.mouseToggle('down');
        }).bind(this);
        
        
        gameArea.onmouseup = (function (event) {
            this.mouseToggle('up',event);
        }).bind(this);
        
        gameArea.onmouseout = (function (event) {
            this.mouseToggle('up',event);
        }).bind(this);
        
        
        
        /**
         * Entity controlled by this bindings
         * @type {WorldObject}
         */
        this.subject = subject;

        /**
         * Table of pressed keys
         * @type {Object}
         */
        this.keyPressed = {};
    }

    keyDown(event) {
        if (this.keyPressed[event.code] > 0) {
            //already pressed
        } else {
            this.keyPressed[event.code] = new Date();

            var methodName = "";
            var mParam = {
                time: this.keyPressed[event.code]
            };

            var kCode = event.code;
            //Different bindings
            if (kCode === 'ArrowLeft') {
                methodName = "beginIncreasingRotation";
            } else if (kCode === 'ArrowRight') {
                methodName = "beginDecreasingRotation";
            } else if (kCode === 'KeyW') {
                methodName = "beginIncreasingSpeedForward";
            } else if (kCode === 'KeyS') {
                methodName = "beginDecreasingSpeedForward";
            }else if (kCode === 'KeyA') {
                methodName = "beginIncreasingSpeedSide";
            } else if (kCode === 'KeyD') {
                methodName = "beginDecreasingSpeedSide";
            }

            if (methodName.length > 0) {
                this.subject[methodName](mParam);
            }
        }
    }

    keyUp(event) {
        if (!(event.code in this.keyPressed)) {
            //not
        } else {
            delete(this.keyPressed[event.code]);

            var methodName = "";
            var mParam = {
                time: this.keyPressed[event.code]
            };

            var kCode = event.code;
            //Different bindings
            if (kCode === 'ArrowLeft') {
                methodName = "endIncreasingRotation";
            } else if (kCode === 'ArrowRight') {
                methodName = "endDecreasingRotation";
            }else if (kCode === 'KeyW') {
                methodName = "endIncreasingSpeedForward";
            } else if (kCode === 'KeyS') {
                methodName = "endDecreasingSpeedForward";
            }else if (kCode === 'KeyA') {
                methodName = "endIncreasingSpeedSide";
            } else if (kCode === 'KeyD') {
                methodName = "endDecreasingSpeedSide";
            }

            if (methodName.length > 0) {
                this.subject[methodName](mParam);
            }
        }
    }

    mouseToggle(type,event){
        var code= "MOUSE" + event.button+"_"+type;
        if (this.keyPressed[code] > 0) {
            //already pressed
        } else {
            this.keyPressed[code] = new Date();

            var rect = event.target.getBoundingClientRect();
  
            var methodName = "";
            var mParam = {
                time: this.keyPressed[event.code],
                positionX: event.clientX - rect.left,
                positionY: event.clientY - rect.top
            };
            
            if (code === 'MOUSE0_down') {
                methodName = "beginShoot";
            }else if(code === 'MOUSE0_up'){
                methodName = "endShoot";
            }

            if (methodName.length > 0) {
                this.subject[methodName](mParam);
            }
        }
    }
    

    /**
     * Perform all actions that should be performed based on the keys pressed
     * @param {integer} timeDiff
     * @returns {undefined}
     */
    tick(timeDiff) {
        var currentTime = new Date();
        // GO through all the keyPressed
        for (var kCode in this.keyPressed) {
            var myTime = timeDiff;

            if (typeof (this.keyPressed[kCode]) !== "boolean" && this.keyPressed[kCode] > 0) {
                //time when it got pressed is provided
                myTime = currentTime - this.keyPressed[kCode];
                this.keyPressed[kCode] = true;
            }

        }
    }

}



export default KeyBindings;