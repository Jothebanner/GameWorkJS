'use strict';

import InputSingleton from "./InputSingleton.js";
import Omnilist from "./Omnilist.js";
import Vector3 from "./Vector3.js";
import Vector2 from "./Vector2.js";
import WorldComponentBase from "./WorldComponentBase.js";

// TODO: refactor gamecomponentbase and renderablecomponentbase
class Camera extends WorldComponentBase {
    constructor(context, position = new Vector3(0, 0, -5), aspectRatio = { x: 0, y: 0 }, focal = 1) // -5 is a good default for z if other object default at 0
    {
        // forward the position on to the base
        super(position);
        // The holder of the context. Anything to be displayed goes through him
        this.context = context;
        //TODO: remove this and set during initialization
        this.resolution = { x: 0, y: 0 }
        // IDEA: perhaps an aspect ratio variable would work. You could change it realtime tho keeping things centered might be interesting
        this.aspectRatio = aspectRatio;
        this.aspectRatio.x = aspectRatio.x;
        this.aspectRatio.y = aspectRatio.y;
        // default resolution modifier TODO: make more?
        this.resolutionMod = { x: 0, y: 0 };
        this.resolutionMod.x = this.context.canvas.width / this.resolution.x;
        this.resolutionMod.y = this.context.canvas.height / this.resolution.y;
        // center the camera in the screen by default
        this.xScreenPosition = context.canvas.width / 2;
        this.yScreenPosition = context.canvas.height / 2;

        this.focal = focal;

        // recenter when the screen changes
        window.addEventListener("resize", this.updateScreenMod);
    }

    updateScreenMod = () => {
        //idk why 120, but 1920/16 and 1080/9 both equal 120 so it's probably a safe bet. Might look icky on 2k or 4 monitors tho :/
        this.resolution.x = this.aspectRatio.x * 120;
        this.resolution.y = this.aspectRatio.y * 120;
        // resize all of the items drawn to match the screen
        this.resolutionMod.x = this.context.canvas.width / (this.aspectRatio.x * 120);
        this.resolutionMod.y = this.context.canvas.height / (this.aspectRatio.y * 120);
        // recenter the camera in the middle of the screen
        this.xScreenPosition = this.context.canvas.width / 2;
        this.yScreenPosition = this.context.canvas.height / 2;
    }

    frameUpdate() {
        this.drawItems();
    }


    //IDEA: if it's a gameobject then try to draw it's components. That way the gameobject can be disabled and all of it's components will be disabled
    //IDEA: maybe on each loop the gameobject should register to be drawn?

    //TODO: sort by z and render the closest things last
    //TODO: don't display things not in-frame
    drawItems() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        Omnilist.getInstance().getList().forEach((item) => this.drawItem(item));
    }

    drawItem = (item) => {
        // if it talks like a duck
        if (item.isEnabled() === true && typeof (item.draw) == "function") {
            let distanceModifier;
            if (item.getPosition().z === 0) {
                // if the item's z position is zero then render it as though it's very close to zero
                distanceModifier = 1 / 0.000001;
            }
            else {   //TODO: rework this so it's not bad // for future me: if an object is not in-front of the camera then don't display it. something feels icky about the code
                if (this.getPosition().z - item.getPosition().z < 0)
                    distanceModifier = this.focal / Math.abs(this.getPosition().z - item.getPosition().z); // TODO: focal length of one isn't very dynamic. mess with this later
                else
                    distanceModifier = false;
            }
            
            item.draw(this.context, distanceModifier, this.resolutionMod, new Vector2(this.xScreenPosition, this.yScreenPosition), new Vector2(this.getPosition().x, this.getPosition().y));
        }
    }

    // everything should be in the perspective of the camera. // I really should've started the project with this lol
}

export default Camera;