import RenderableComponentBase from "./RenderableComponentBase.js";

class SquareRenderer extends RenderableComponentBase {
    constructor(xPos, yPos, color, xSize = 1, ySize = 1) {
        super();
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;
        this.xSize = xSize;
        this.ySize = ySize;
        this.lastError = null;
        this.errorCount = 0;
    }

    frameUpdate() {
        this.draw(this.context, this.xPos + this.parentObject.xPos, this.yPos + this.parentObject.yPos);
    }

    draw(context, x, y) {
        try {
            context.fillStyle = this.color;
            context.fillRect(x * this.xScale, y * this.xScale, this.xSize * this.xScale, this.ySize * this.yScale);
        } catch (error) {
            if (error === this.lastError)
            {
                this.lastError = error;
                this.errorCount++;
                console.log(error + this.errorCount);
            }
            else
                this.errorCount = 0;
        }
    }
}

export default SquareRenderer;