'use strict'

class KeyBindings {
    constructor(subject) {
        //Binding
        window.onkeydown = (function (event) {
            this.keydown(event);
        }).bind(this);

        window.onkeyup = (function (event) {
            this.keyup(event);
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

    keydown(event) {
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
            if (kCode === 'KeyA') {
                methodName = "beginIncreasingRotation";
            } else if (kCode === 'KeyD') {
                methodName = "beginDecreasingRotation";
            }

            if (methodName.length > 0) {
                this.subject[methodName](mParam);
            }
        }
    }

    keyup(event) {
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
            if (kCode === 'KeyA') {
                methodName = "endIncreasingRotation";
            } else if (kCode === 'KeyD') {
                methodName = "endDecreasingRotation";
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