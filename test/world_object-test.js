import WorldObject from '../src/model/objects/world_object'
        import Circle from '../src/model/shapes/circle'

        const epsilon = 0.00001;


test('angles', () => {
    var a = new WorldObject({x: 0, y: 0});
    var b = new WorldObject({x: 1, y: 1});
    var c = new WorldObject({x: -1, y: 0});


    expect(a.angleTo(b)).toBeCloseTo(Math.PI / 4);
    expect(b.angleTo(a)).toBeCloseTo((Math.PI / 4) + Math.PI);
    expect(a.angleTo(c)).toBeCloseTo(Math.PI);
    expect(b.angleTo(c)).toBeCloseTo(Math.PI + Math.atan(1 / 2));
    expect(c.angleTo(b)).toBeCloseTo(Math.atan(1 / 2));
});

test('distances', () => {
    var a = new WorldObject({x: 0, y: 0});
    var b = new WorldObject({x: 1, y: 1});
    var c = new WorldObject({x: -1, y: 0});


    expect(a.distanceTo(b)).toBeCloseTo(Math.sqrt(2));
    expect(b.distanceTo(a)).toBeCloseTo(Math.sqrt(2));
    expect(a.distanceTo(c)).toBeCloseTo(1);
    expect(c.distanceTo(a)).toBeCloseTo(1);
});

test('collisions', () => {
    var a = new WorldObject({x: 0, y: 0, shape: new Circle({radius: 5.1})});
    var b = new WorldObject({x: 10, y: 0, shape: new Circle({radius: 5})});


    expect(a.collidesWith(b)).toEqual(true);
    expect(b.collidesWith(a)).toEqual(true);
    
    //change shape
    a.shape= new Circle({radius: 4});
    expect(a.collidesWith(b)).toEqual(false);
    expect(b.collidesWith(a)).toEqual(false);

});
