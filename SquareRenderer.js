'use strict';

import RenderableComponentBase from "./RenderableComponentBase.js";

class SquareRenderer extends RenderableComponentBase {
    constructor(color, position, xSize = 1, ySize = 1, preserveObjectSize = true) {
        super(position);
        this.color = color;
        this.xSize = xSize;
        this.ySize = ySize;
        this.xPosScaleModifier = 1;
        this.yPosScaleModifier = 1;
        this.preserveObjectSize = true;
        this.errorCount = 0;
    }

    frameUpdate() {

    }

    // renderPos = (pos + parentPos) + cameraPos
    // renderSize = size * scale * parentScale * cameraDistance(camera perspective) * resolutionModifier

    // 0,0 -> 1,1

    // this will be called by the camera so we need to preserve scope
    // idea: Perhaps everything should have a scale and position modifier. That should work with everything, lines, arcs, sprites
    draw = (context, cameraDistanceMod, resolutionMod, cameraScreenPos, cameraWorldPos) => {
        try {
            context.fillStyle = this.color;


            // Keeping this because it is a good process to be reminded of


            // the maths
            //     get the position in world   then set it to be from the cameras perspective - this should be easy since there is no rotation
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

            // adding unnecessary parenthesis for readabiltiy
            let xPos = cameraScreenPos.x + (((this.getPosition().x - cameraWorldPos.x) * cameraDistanceMod) * resolutionMod.x)
            let yPos = cameraScreenPos.y + (((this.getPosition().y - cameraWorldPos.y) * -cameraDistanceMod) * resolutionMod.y)

            let xSize;
            let ySize;

            if (this.preserveObjectSize) {

                xSize = this.xSize * this.getScale().x * cameraDistanceMod;
                // negative cameradistancemod since canvas counts up towards bottom right so we need to flip horizontal
                ySize = this.ySize * this.getScale().y * -cameraDistanceMod;
            }
            else
            {
                xSize = this.xSize * this.getScale().x * cameraDistanceMod * resolutionMod.x;
                // negative cameradistancemod since canvas counts up towards bottom right so we need to flip horizontal
                ySize = this.ySize * this.getScale().y * -cameraDistanceMod * resolutionMod.y;
            }

            // third try
            context.fillRect(
                // world position
                xPos,
                yPos,
                xSize,
                ySize
            );
        } catch (error) {
            console.log(error + this.errorCount);
        }
    }
}

export default SquareRenderer;