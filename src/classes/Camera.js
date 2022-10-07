import GameComponentBase from "./GameComponentBase";
import InputSingleton from "./InputSingleton";
import Omnilist from "./Omnilist";
import RenderableComponentBase from "./RenderableComponentBase";
import Vector3 from "./Vector3";
import Vector2 from "./Vector2";

// TODO: refactor gamecomponentbase and renderablecomponentbase
class Camera extends RenderableComponentBase {
    constructor(context, position)
    {
        // forward the position on to the base
        super(position);
        // The holder of the context. Anything to be displayed goes through him
        this.context = context;
        //TODO: remove this and set during initialization
        this.resolution = {x: 1920, y: 1080}
        // default resolution modifier TODO: make more?
        this.wideScreenMod = this.context.canvas.width / this.resolution.x;
        // center the camera in the screen by default
        this.xScreenPosition = context.canvas.width / 2;
        this.yScreenPosition = context.canvas.height / 2;

        // recenter when the screen changes
        window.addEventListener("resize", this.updateScreenMod);
    }

    updateScreenMod = () =>
    {
        // resize all of the items drawn
        this.wideScreenMod = this.context.canvas.width / this.resolution.x;
        // recenter the camera in the middle of the screen
        this.xScreenPosition = this.context.canvas.width / 2;
        this.yScreenPosition = this.context.canvas.height / 2;
    }

    frameUpdate()
    {
        //TODO: remove this eventually
        if (InputSingleton.getInstance().getKey("j"))
        {
            this.xPos -= 2;
        }
        // zooming is really fun :D
        if (InputSingleton.getInstance().getKey("u"))
        {
            this.zPos -= 2;
        }
        if (InputSingleton.getInstance().getKey("o"))
        {
            this.zPos += 2;
        }
        this.drawItems();
    }


    //IDEA: if it's a gameobject then try to draw it's components. That way the gameobject can be disabled and all of it's components will be disabled
    //IDEA: maybe on each loop the gameobject should register to be drawn?

    //TODO: sort by z and render the closest things last
    drawItems()
    {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        Omnilist.getInstance().getList().forEach((item) => this.drawItem(item));
        // I feel like this should preserve "this"
        //TODO: learn more about scope
         //=> {
            //let distance = this.parentObject.zPos - item.zPos;
            //item.draw(this.context, this.wideScreenMod);
        //});
    }

    
    // preserve scope?
    drawItem = (item) => {
        // if it talks like a duck
        if (item.isEnabled() === true && typeof(item.draw) == "function")
        {
            let distanceModifier;
            if (item.getWorldPosition().z === 0)
            {
                // if the item's z position is zero then render it as tho it's very close to zero
                distanceModifier = 1 / 0.000001;
            }
            else
            {   //TODO: rework this so it's not bad
                if (this.getWorldPosition().z - item.getWorldPosition().z < 0)
                    distanceModifier = 1 / Math.abs(this.getWorldPosition().z - item.getWorldPosition().z);
                else
                    distanceModifier = false;
            }

            let drawData = this.calculateScaleAndPosition(item, distanceModifier, this.wideScreenMod, new Vector2(this.xScreenPosition, this.yScreenPosition), new Vector2(this.getWorldPosition().x, this.getWorldPosition().y));

            // I love javascript so much
            item.draw(this.context, ...drawData);
        }
    }

    // should only be called here so no lambda/arrow function // TODO: this probably should live inside the draw item function for now
    calculateScaleAndPosition(item, cameraDistanceMod, resolutionMod, cameraScreenPos, cameraWorldPos)
    {
            // Keeping this because it is a good process to be reminded of
            

            // // get position

            // let xPosInWorld = this.xPos + this.parentObject.xPos;
            // let yPosInWorld = this.yPos + this.parentObject.yPos;

            // // get signed distance from camera
            // let xDistanceFromCamera = xPosInWorld - cameraWorldPos.x;
            // let yDistanceFromCamera = yPosInWorld - cameraWorldPos.y;

            // // 
            // let xPosToCamera = xDistanceFromCamera * cameraDistanceMod;
            // let yPosToCamera = yDistanceFromCamera * cameraDistanceMod;

            // // let the screen be from the perspective of the camera
            // let xPosOnScreen = (cameraScreenPos.x) + (xPosToCamera * resolutionMod);
            // // canvas position naturally counts up towards bottom right; we want to count up towards top right, so we flip the horizontal
            // // kinda funny, because it's like actual cameras work lol ya gotta flip the horizontal because of how focals work
            // let yPosOnScreen = (cameraScreenPos.y) + (-yPosToCamera * resolutionMod);

            
            // // get size

            // let xSizeInWorld = this.xSize * this.xScale * this.parentObject.xScale;
            // let ySizeInWorld = this.ySize * this.yScale * this.parentObject.yScale;

            // let xSizeToCamera = xSizeInWorld * cameraDistanceMod;
            // let ySizeToCamera = ySizeInWorld * cameraDistanceMod;

            // let xSizeOnScreen = xSizeToCamera * resolutionMod;
            // let ySizeOnScreen = ySizeToCamera * resolutionMod;

            // adding too unnecessary parenthesis for readabiltiy 
            let xPos = cameraScreenPos.x + ((((item.xPos + item.parentObject.xPos) - cameraWorldPos.x) * cameraDistanceMod) * resolutionMod)
            let yPos = cameraScreenPos.y + ((((item.yPos + item.parentObject.yPos) - cameraWorldPos.y) * -cameraDistanceMod) * resolutionMod)

            let xSize = item.xSize * item.xScale * item.parentObject.xScale * cameraDistanceMod * resolutionMod;
            // negative cameradistancemod since canvas counts up towards bottom right so we need to flip horizontal
            let ySize = item.ySize * item.yScale * item.parentObject.yScale * -cameraDistanceMod * resolutionMod;

            return ([xPos, yPos, xSize, ySize]);
    }

    // everything should be in the perspective of the camera. // I really should've started the project with this lol
}

export default Camera;