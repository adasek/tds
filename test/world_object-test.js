import WorldObject from '../src/model/objects/world_object'

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
