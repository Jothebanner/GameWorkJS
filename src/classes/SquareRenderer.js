class SquareRenderer {
    constructor(x, y, color) {
        this.context = null;
        this.parent = null;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    setParent(parent, context) {
        this.context = context;
        this.parent = parent;
    }

    frameUpdate() {
        this.draw(this.context, this.x, this.y);
    }

    draw(context, x, y) {
        context.fillStyle = "white";
        context.fillRect(x, y, 1, 1);
    }
}

export default SquareRenderer;