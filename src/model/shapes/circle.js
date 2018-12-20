/**
 * Shape creating the circle
 */
import Shape from './shape';

class Circle extends Shape {
    constructor(opts) {
        super(opts);
        this.radius = opts.radius || 10;
        this.type="circle";
    }

}

export default Circle;