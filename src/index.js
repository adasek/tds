// See: https://www.valentinog.com/blog/webpack-tutorial/

import World from './model/world';
import Renderer from './view/renderer';
import KeyBindings from './controller/keybindings'


        window.onload = function () {

            var world = new World(16 / 9);


            var renderer = new Renderer(world);

            var keyBindings = new KeyBindings(world.player, renderer.gameArea);


            //start simulation
            //temporary
            var tickFunc = function () {
                world.tick(33);
                renderer.render(world);
                keyBindings.tick(33);
                //window.setTimeout(tickFunc,500);
                window.requestAnimationFrame(tickFunc);
            };
            window.requestAnimationFrame(tickFunc);
        };