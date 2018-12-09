'use strict'

class Renderer {
    constructor(world) {
        this.gameArea = document.getElementById('gameArea');
        if (this.gameArea === null) {
            throw "No #gameArea found";
        }

        this.htmlElements = {};

        //schedule the rendering
        window.requestAnimationFrame(this.render.bind(this, world));
    }

    render(world) {
        //render world itself
        this.worldElement = this.findOrCreateElement(world);
        this.worldElement.width = world.width + "px";
        this.worldElement.height = world.height + "px";

        for (var i = 0; i < world.gameObjects.length; i++) {
            var object = world.gameObjects[i];
            //go through the game objects
            var htmlElement = this.findOrCreateElement(object);

            if (object.shape.constructor.name === "Circle") {
                //Radius: in the shape
                //color, center x, center y in gameObjects[i]
                //show such a circle in css
                htmlElement.style.borderRadius = "25%";
                htmlElement.style.left = (object.x - object.shape.radius) + "px";
                htmlElement.style.top = (object.y - object.shape.radius) + "px";
                htmlElement.style.rotation = object.rotation;
                htmlElement.style.backgroundColor = object.color;
                htmlElement.style.width = (object.shape.radius * 2) + "px";
                htmlElement.style.height = (object.shape.radius * 2) + "px";
            } else {
                throw "Unsupported shape: " + object.shape.constructor.name;
            }

        }
        window.requestAnimationFrame(this.render.bind(this, world));
    }

    findOrCreateElement(obj) {
        var id = "";
        if (obj.constructor.name === "World") {
            id = "world";
        } else {
            //world objects should all have unique id
            id = obj.constructor.name + "-" + obj.id;
        }

        var htmlElement = this.htmlElements[id];
        if (typeof (htmlElement) === "undefined" || htmlElement === null) {
            htmlElement = document.createElement('div');
            htmlElement.setAttribute('id', id);
            this.gameArea.appendChild(htmlElement);

            //add to my cache
            this.htmlElements[id] = htmlElement;
        }
        return htmlElement;
    }

}


module.exports = Renderer;