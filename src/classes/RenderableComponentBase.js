import GameComponentBase from "./GameComponentBase.js"

class RenderableComponentBase extends GameComponentBase {
    
    constructor()
    {
        super();
        // renderable objects will probably need to scale
        this.xScale = 1;
        this.yScale = 1;

        // any renderable object should have a position or at least a "starting position" in the case of a linerenderer
        // this should be set when the component is being created, but I think it needs to default to something if not
        this.xPos = 0;
        this.yPos = 0;

        // if it's renderable then it needs a canvas to render from
        this.context = null;
        
        this.startFunctions.push(this.setContext);
        this.startFunctions.push(this.setListeners);
    }

    setXScale(eventResponse) {
        this.xScale = eventResponse.detail;
    }

    // testing out the scope of an arrow function
    setYScale = (eventResponse) => {
        this.yScale = eventResponse.detail;
    }

    setContext = () =>
    {
        this.context = this.gameObject.context;
    }
    
    //  this bad boi is called when the component is added
    setListeners = () =>
    {
        this.gameObject.onXScale.addEventListener('updateXScale', this.setXScale.bind(this));
        this.gameObject.onYScale.addEventListener('updateYScale', this.setYScale); 
    }

    // for when the component is removed
    disconnectListeners()
    {
        this.gameObject.onXScale.removeEventListener('updateXScale', this.setXScale);
        this.gameObject.onYScale.removeEventListener('updateYScale', this.setYScale.bind(this));
    }
}

export default RenderableComponentBase;