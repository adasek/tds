// See: https://www.valentinog.com/blog/webpack-tutorial/

import World from './model/world';
import Renderer from './view/renderer';


window.onload = function () {

    var world = new World(16 / 9);
    
    //start simulation
    //temporary
    setInterval(world.tick.bind(world, 50), 50);

    //starts rendering
    var renderer = new Renderer(world);


};