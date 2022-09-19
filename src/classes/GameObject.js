import GameComponentBase from "./GameComponentBase";

class GameObject extends GameComponentBase {

    constructor(xPos, yPos) {
        super();
        this.gameManager = null;
        this.context = null;
        this.xPos = xPos;
        this.yPos = yPos;
        this.xScale = 1;
        this.yScale = 1;
        this.components = new Array(0);
        this.onXScale = new EventTarget();
        this.onYScale = new EventTarget();

        // these functions get the gameObject sent to them
        this.startFunctions.push(this.setGameContext);
        this.startFunctions.push(this.setListeners);
    }

    //TODO: fix this mess
    setGameContext = (context) => {
        if (context === this.gameObject)
        {
            this.context = this.gameObject.context;
        }
        else
            this.context = context;
    }

    setGameManager(gameManager) {
        this.gameManager = gameManager;
    }

    setXScale(scale) {
        this.xScale = scale.detail;
        this.onXScale.dispatchEvent(new CustomEvent('updateXScale', { 'detail': this.xScale }));
    }

    setYScale(scale) {
        this.yScale = scale.detail;
        this.onYScale.dispatchEvent(new CustomEvent('updateYScale', { 'detail': this.yScale }));
    }

    setListeners = (xScaleET, yScaleET) => {
        if (xScaleET === undefined || yScaleET === undefined) {
            this.gameObject.onXScale.addEventListener('updateXScale', this.setXScale.bind(this));
            this.gameObject.onYScale.addEventListener('updateYScale', this.setYScale.bind(this));
        }
        else {
            xScaleET.addEventListener('updateXScale', this.setXScale.bind(this));
            yScaleET.addEventListener('updateYScale', this.setYScale.bind(this));
        }
    }

    addChild(component) {
        this.components.push(component);

        // set the GameObject at the GameComponentBase class
        // everything else can then pull from there from the start function
        try {
            component.initializeGameComponent(this);
        } catch (error) {
            console.log(error);
        }

        try {
            this.callComponentStartFuction(component);
        } catch (error) {
            console.log(error);
        }
    }

    start() {
        if (this.components.length > 0)
            this.components.forEach(this.callComponentStartFuction);
    }

    callComponentStartFuction(component) {
        if (typeof (component.start) == "function") {
            try {
                component.start();
            } catch (error) {
                console.log(error);
            }
        }
    }

    frameUpdate() {
        this.components.forEach(this.callComponentFrameUpdateFuction);
    }

    callComponentFrameUpdateFuction(component) {
        if (typeof (component.frameUpdate) == "function") {
            try {
                component.frameUpdate();
            } catch (error) {
                console.log(error);
            }
        }
    }

    physicsUpdate() {
        this.components.forEach(this.callComponentPhysicsUpdateFuction);
    }

    callComponentPhysicsUpdateFuction(component) {
        if (typeof (component.physicsUpdate) == "function") {
            try {
                component.physicsUpdate();
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default GameObject;