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

            setTimeout(function () {
                console.log("SAVING")
                this.savedState = world.saveMemento();
                console.log(this.savedState);

            }.bind(this), 5 * 1000);

            setTimeout(function () {
                world.loadMemento(this.savedState);
            }.bind(this), 10 * 1000);

        };