import GameComponentBase from "../classes/GameComponentBase";
import InputSingleton from "../classes/InputSingleton";
import Omnilist from "../classes/Omnilist";
import Vector3 from "../classes/Vector3";

class ShipMovement extends GameComponentBase {
    constructor()
    {
        super();
        this.moveHorizontal = 0;
        this.moveVertical = 0;
    }

    start()
    {
        
    }

    frameUpdate()
    {
        let parentPos = this.parentObject.getPosition();
        if (InputSingleton.getInstance().getKeyDown("d"))
        {
            this.parentObject.setPosition(new Vector3(parentPos.x + 50, parentPos.y, parentPos.z));
        }

        if (InputSingleton.getInstance().getKey("a"))
        {
            this.parentObject.setPosition(new Vector3(parentPos.x - 50, parentPos.y, parentPos.z));
        }

        if (InputSingleton.getInstance().getKey("w"))
        {
            this.parentObject.movePosition(new Vector3(0, 50, 0));
        }

        if (InputSingleton.getInstance().getKey("s"))
        {
            this.parentObject.setPosition(new Vector3(parentPos.x, parentPos.y - 50, parentPos.z));
        }

        if (InputSingleton.getInstance().getKey("p"))
        {
            console.log(Omnilist.getInstance().getList());
        }
    }

    // Tasmanian Glow By Strawberry Girls

    lateUpdate()
    {
        //TODO: this does not belong here lol
        InputSingleton.getInstance().clearArrays();
    }
}

export default ShipMovement;