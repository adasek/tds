// See: https://www.valentinog.com/blog/webpack-tutorial/

import World from './model/world';
import Renderer from './view/renderer';
import KeyBindings from './controller/keybindings'


        window.onload = function () {

            var world = new World(16 / 9);

            var keyBindings = new KeyBindings(world.player);

            //start simulation
            //temporary
            setInterval(world.tick.bind(world, 50 / 1000), 50);

            //keybindings
            setInterval(keyBindings.tick.bind(keyBindings, 50 / 1000), 50);


            //starts rendering
            var renderer = new Renderer(world);


        };