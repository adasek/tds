/**
 * Class for game object physical proerties such as speed, rotation speed
 * and size in the game World 
 * @type type
 */

'use strict'

class PhysicalProperty {

    constructor(opts) {

        this.max = opts.max || 1;
        this.min = opts.min || 0;
        this.default = opts.default || 0;
        this.increaseSlopePositive = opts.increaseSlopePositive || 0.01; //0 to 1 in 100ms
        this.decreaseSlopePositive = opts.decreaseSlopePositive || 0.1; //1 to 0 in 10ms
        this.increaseSlopeNegative = opts.increaseSlopeNegative || 0; //0 to 1 in 100ms
        this.decreaseSlopeNegative = opts.decreaseSlopeNegative || 0; //1 to 0 in 10ms


        this.state = this.newState();
        this.presentTime = new Date(); //date for which the value is in effect

        this.events = [];
    }

    checkAdd(time) {
        if (this.presentTime >= time) {
            throw "Cannot modify the past";
        }
        if (typeof (time) !== "object" || typeof time.getTime !== 'function') {
            throw "Bad parameter time";
        }
    }

    valueAt(time) {
        //last event
        for (var i = this.events.length - 1; i >= 0; i--) {
            if (time >= this.events[i].time) {
                //that is last event before my desired time
                var ret = this.events[i].state.value;
                var timeDiff = (time.getTime() - this.events[i].time.getTime());
                if (this.events[i].state.isIncreasing) {
                    //example: ArrowUp pushed
                    ret += timeDiff * this.increaseSlopePositive;
                } else if (ret > this.default) {
                    //entropy = change back to default state
                    ret -= timeDiff * this.decreaseSlopePositive;
                    if (ret < this.default) {
                        ret = this.default;
                    }
                }
                if (this.events[i].state.isDecreasing) {
                    //example: ArrowDown pushed
                    ret -= timeDiff * this.decreaseSlopeNegative;
                } else if (ret < this.default) {
                    //entropy = change back to default state
                    ret += timeDiff * this.increaseSlopeNegative;
                    if (ret > this.default) {
                        ret = this.default;
                    }
                }

                if (ret > this.max) {
                    ret = this.max;
                }
                if (ret < this.min) {
                    ret = this.min;
                }
                if (typeof (ret) !== "number" || Number.isNaN(ret)) {
                    throw "valueAt failed";
                }
                return ret;
            }
        }
        //when this.events is empty
        if (typeof (this.state.value) !== "number" || Number.isNaN(this.state.value)) {
            throw "valueAt failed";
        }
        return this.state.value;
    }

    newState(oldState, appendState) {
        if (typeof (oldState) !== "object" || oldState === null) {
            //default state
            oldState = {value: 0, isIncreasing: false, isDecreasing: false};
        }
        if (typeof (appendState) !== "object") {
            appendState = {};
        }
        return {
            value: ("value" in appendState) ? appendState.value : oldState.value,
            isIncreasing: ("isIncreasing" in appendState) ? appendState.isIncreasing : oldState.isIncreasing,
            isDecreasing: ("isDecreasing" in appendState) ? appendState.isDecreasing : oldState.isDecreasing
        };
    }

    beginIncreasing(opts)
    {
        var time = opts.time || new Date();
        this.checkAdd(time);

        this.events.push({
            time: time,
            change: "beginIncreasing",
            state: this.newState(this.state, {isIncreasing: true}),
            value: this.valueAt(time)
        });
        this.state.isIncreasing = true;
    }
    endIncreasing(opts) {
        var time = opts.time || new Date();
        this.checkAdd(time);

        this.events.push({
            time: time,
            change: "endIncreasing",
            state: this.newState(this.state, {isIncreasing: false}),
            value: this.valueAt(time)
        });
        this.state.isIncreasing = false;
    }
    beginDecreasing(opts) {
        var time = opts.time || new Date();
        this.checkAdd(time);

        this.events.push({
            time: time,
            change: "beginDecreasing",
            state: this.newState(this.state, {isDecreasing: true}),
            value: this.valueAt(time)
        });
        this.state.isDecreasing = true;
    }
    endDecreasing(opts) {
        var time = opts.time || new Date();
        this.checkAdd(time);

        this.events.push({
            time: time,
            change: "endDecreasing",
            state: this.newState(this.state, {isDecreasing: false}),
            value: this.valueAt(time)
        });
        this.state.isDecreasing = false;
    }

    get value() {
        return this.valueAt();
    }

}

export default PhysicalProperty;