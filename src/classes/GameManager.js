class GameManager {

    constructor(gameContext = null)
    {
        this.gameContext = gameContext;
        this.gameObjects = new Array();
        this.xScale = 1;
        this.yScale = 1;
        this.onXScale = new EventTarget();
        this.onYScale = new EventTarget();
        //this.updateXScale = new CustomEvent('updateXScale', {'detail': this.xScale});
        //this.onXScale.addEventListener("updateXScale", this.sanityCheck);
    }

    //when the event target is disptached it runs each of the eventlisteners 

    setGameContext(gameContext)
    {
        this.gameContext = gameContext;
    }

    sanityCheck()
    {
        console.log("I am sane");
    }

    setXScale(xScale)
    {
        this.xScale = xScale;
        this.onXScale.dispatchEvent(new CustomEvent('updateXScale', {'detail': this.xScale}));
    }

    setYScale(yScale)
    {
        this.yScale = yScale;
        this.onYScale.dispatchEvent(new CustomEvent('updateYScale', {'detail': this.yScale}));
    }

    addGameObject(gameObject)
    {
        try {
            this.gameObjects.push(gameObject);
        } catch (error) {
            console.log(error);
        }
        
        try {
            gameObject.setGameContext(this.gameContext);
            gameObject.setGameManager(this);
        } catch (error) {
            console.log(error);
        }

        try {
            this.callGameObjectStartFuction(gameObject);
        } catch (error) {
            console.log(error);
        }

        console.log(this.gameObjects);
    }

    callGameObjectStartFuction(gameObject) {
        if (typeof gameObject.start == "function") {
            try {
                gameObject.start();
            } catch (error) {
                console.log(error);
            }
        }
    }

    frameUpdateLoop() {
        if (this.gameObjects.length > 0)
            this.gameObjects.forEach(this.gameObjectFrameUpdate);
    }

    gameObjectFrameUpdate(gameObject) {
        if (typeof gameObject.frameUpdate == "function") {
            try {
                gameObject.frameUpdate();
            } catch (error) {
                console.log(error);
            }
        }
    }

    physicsUpdateLoop() {
        if (this.gameObjects.length > 0)
            this.gameObjects.forEach(this.gameObjectPhysicsUpdate);
    }

    gameObjectPhysicsUpdate(gameObject) {
        if (typeof gameObject.physicsUpdate == "function") {
            try {
                gameObject.physicsUpdate();
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default GameManager;