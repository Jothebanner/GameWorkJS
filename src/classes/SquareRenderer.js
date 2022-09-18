import RenderableComponentBase from "./RenderableComponentBase.js";

class SquareRenderer extends RenderableComponentBase {
    constructor(xPos, yPos, color, xSize = 1, ySize = 1) {
        super();
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;
        this.xSize = xSize;
        this.ySize = ySize;
    }

    start() {
        this.setListeners();
    }

    frameUpdate() {
        this.draw(this.context, this.xPos, this.yPos);
    }

    draw(context, x, y) {
        context.fillStyle = "white";
        context.fillRect(x * this.xScale, y * this.xScale, 1 * this.xScale, 1 * this.yScale);
    }
}

export default SquareRenderer;