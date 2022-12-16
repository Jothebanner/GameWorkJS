//import DrawableObject from "./DrawableObject";

class Sprite {
    constructor (height, width, image, xPosition = 0, yPosition = 0)
    {
        this.height = height;
        this.width = width;
        if (typeof(image) == "string")
        {
            this.image = new Image();
            this.image.src = image;
        }
        else
        {
            this.image = image;
        }
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.context2D = null;
        this.gameObject = null;
        this.xScale = 1;
        this.yScale = 1;
    }
    
    setXScale(scale) {
        //this.xScale = scale.detail;
        this.draw(this.context2D, this.xScale, this.yScale);
    }

    setYScale(scale) {
        this.yScale = scale.detail;
    }

    setListeners()
    {
        this.gameObject.onXScale.addEventListener('updateXScale', this.setXScale.bind(this));
        this.gameObject.onYScale.addEventListener('updateYScale', this.setYScale.bind(this)); 
    }

    start()
    {
        this.setListeners();
    }

    setContext(context)
    {
        this.context2D = context;
    }

    setGameObject(gameObject)
    {
        this.gameObject = gameObject;
    }

    frameUpdate()
    {
        this.draw(this.context2D, this.xScale, this.yScale);
    }

    draw(context2D, xScale, yScale) {

        context2D.drawImage(this.image, this.xPosition * this.gameObject.xScale, this.yPosition * this.gameObject.xScale, this.width * this.gameObject.xScale, this.height * this.gameObject.xScale);
    }
}

export default Sprite;