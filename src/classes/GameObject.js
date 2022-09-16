class GameObject {

    constructor(xPos, yPos) {
        this.gameManager = null;
        this.gameContext = null;
        this.xPos = xPos;
        this.yPos = yPos;
        this.xScale = 1;
        this.yScale = 1;
        this.components = new Array(0);
        this.onXScale = new EventTarget();
        this.onYScale = new EventTarget();
    }
    
    setGameContext(gameContext) {
        this.gameContext = gameContext;
    }

    setGameManager(gameManager) {
        this.gameManager = gameManager;
    }

    setXScale(scale) {
        this.xScale = scale.detail;
        this.onXScale.dispatchEvent(new CustomEvent('updateXScale', {'detail': this.xScale}));
    }

    setYScale(scale) {
        this.yScale = scale.detail;
        this.onYScale.dispatchEvent(new CustomEvent('updateYScale', {'detail': this.yScale}));
    }

    setListeners() {
        this.gameManager.onXScale.addEventListener('updateXScale', this.setXScale.bind(this));
        this.gameManager.onYScale.addEventListener('updateYScale', this.setYScale.bind(this));
    }

    addComponent(component) {
        this.components.push(component);
        //component.setContext(this.gameContext);
        //component.setGameObject(this);
        component.setParent(this, this.gameContext);

        try {
            this.callComponentStartFuction(component);
        } catch (error) {
            console.log(error);
        }
        console.log(this.components);
    }

    initialize() {
        this.start();
    }

    start() {
        this.setListeners();
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