import GameComponentBase from "../classes/GameComponentBase";
import InputSingleton from "../classes/InputSingleton";

class ShipMovement extends GameComponentBase {
    constructor()
    {
        super();
    }

    start()
    {
        
    }

    frameUpdate()
    {
        if (InputSingleton.getInstance().getKey("a"))
        {
            this.parentObject.xPos -= 5 * this.parentObject.xScale;
        }

        if (InputSingleton.getInstance().getKey("d"))
        {
            this.parentObject.xPos += 5 * this.parentObject.xScale;
        }

        if (InputSingleton.getInstance().getKey("w"))
        {
            this.parentObject.yPos -= 5 * this.parentObject.yScale;
        }

        if (InputSingleton.getInstance().getKey("s"))
        {
            this.parentObject.yPos += 5 * this.parentObject.yScale;
        }
    }

    // Tasmanian Glow By Strawberry Girls

    lateUpdate()
    {
        // this does not belong here lol
        InputSingleton.getInstance().clearArrays();
    }
}

export default ShipMovement;