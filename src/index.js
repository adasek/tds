// See: https://www.valentinog.com/blog/webpack-tutorial/

import World from './model/world';

import Renderer from './view/renderer';

var world = new World(16 / 9);


window.onload = function () {
    //starts rendering
    var renderer = new Renderer(world);


};