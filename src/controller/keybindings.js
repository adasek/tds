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
        this.keyPressed[event.code] = new Date();
    }

    keyup(event) {
        delete(this.keyPressed[event.code]);
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

            if (this.keyPressed[kCode] === true) {
                if (kCode === 'KeyA') {
                    this.subject.rotateLeft(myTime);
                }
            }
        }
    }

}



export default KeyBindings;