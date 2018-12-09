/**
 * Shape creating the circle
 */

class Circle extends Shape {
    constructor(opts) {
        opts.radius = opts.radius || 10;

        super(opts);
    }
    
    
}