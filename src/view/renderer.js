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
        this.worldElement.style.width = world.width + "px";
        this.worldElement.style.height = world.height + "px";
        this.gameArea.style.width = world.width + "px";
        this.gameArea.style.height = world.height + "px";

        for (var i = 0; i < world.gameObjects.length; i++) {
            var object = world.gameObjects[i];
            //go through the game objects
            var htmlElement = this.findOrCreateElement(object);

            if (object.shape.constructor.name === "Circle") {
                //Radius: in the shape
                //color, center x, center y in gameObjects[i]
                //show such a circle in css
                htmlElement.style.borderRadius = "20%";
                /*
                 htmlElement.style.left = (object.x - object.shape.radius) + "px";
                 htmlElement.style.top = (world.height - (object.y - object.shape.radius)) + "px";
                 */
                htmlElement.style.transform = 'translate(' + (object.x-object.shape.radius) + 'px,' + (world.height - object.y - object.shape.radius) + 'px) rotate(' + this.rotationToDeg(object.rotation) + ') ';
                htmlElement.style.backgroundColor = object.color;
                htmlElement.style.width = (object.shape.radius * 2) + "px";
                htmlElement.style.height = (object.shape.radius * 2) + "px";
            } else {
                throw "Unsupported shape: " + object.shape.constructor.name;
            }

            if (object.gun) {
                var target = object.gun.target;
                //render two lines on the accuracy border
                var htmlElementGun = this.findOrCreateElement(object.gun);
                if (target == null) {
                    //gun is not shooting
                    htmlElementGun.style.display = "none";
                } else {
                    var accuracy = object.gun.getAccuracy({});
                    var accuracyAngle = object.gun.getAccuracyAngle({});
                    //should show the accuracy somehow
                    htmlElementGun.style.display = "block";
                    htmlElementGun.style.transformOrigin = "center center";

                    var width = object.distanceTo(object.gun.target);
                    var height = Math.max(1, (1 - accuracy) * 10);
                    htmlElementGun.style.width = width + "px";
                    htmlElementGun.style.height = height + "px";
                    var centerX = (object.x + object.gun.target.x) / 2;
                    var centerY = (object.y + object.gun.target.y) / 2;
                    
                    htmlElementGun.style.transform = 'translate(' + (centerX-width/2) + 'px,' + (world.height - (centerY+height/2)) + 'px) rotate(' + this.rotationToDeg(object.angleTo(object.gun.target)) + ')';
                    

                    //  htmlElementGun.style.backgroundColor = "rgba(255,100,100,"+accuracy+")";
                    htmlElementGun.style.backgroundColor = "rgba(255,100,100," + (accuracy + 0.1) + ")";
                }
            }

        }
    }

    rotationToDeg(rot) {
        return ((-rot) * 180 / Math.PI + Math.PI / 2) + "deg";
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