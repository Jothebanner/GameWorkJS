import GameComponentBase from "./GameComponentBase";
import Vector2 from "./Vector2";
import Vector3 from "./Vector3";

// A component that can exist in the world. Like, a script doesn't need to exist in the world, but a collider would.
class WorldComponentBase extends GameComponentBase {
    constructor(position = new Vector3(0,0,1)) {
        super()

        //TODO: rotation

        // would objects will need to be able to scale
        this.scale = new Vector2(1, 1);

        // any renderable object should have a position or at least a "starting position" in the case of a linerenderer
        // when rendering with canvas you need to put the position of the arc/line/square
        this.position = position;

        this.onPositionChange = new EventTarget();
        this.onScaleChange = new EventTarget();

        this.adjustedScale = this.scale;
        this.adjustedPosition = this.position;
        this.startFunctions.push();
    }

    /**
     * Returns the position of the component as a Vector3
     * @returns Vector3
     */
     getPosition = () =>
     {
         if (this.parentObject != null && typeof(this.parentObject.getWorldPosition) == "function")
         {
             // get position with parent position included. This will go up the chain of parent-child relations. Super easy but kinda fells super ineffiecent
             //POOT: I guess I could have some kind of "adjusted position" which would be the components position plus parents position and update it when the parent's position changes
             let parentPos = this.parentObject.getPosition();
             let pos;
             if (parentPos != null)
                pos = new Vector3(this.position.x + parentPos.x, this.position.y + parentPos.y, this.position.z + parentPos.z);
             else
                pos = this.position;

             return pos;
         }
         else
         {
            let pos = this.position;
            return pos;
         }
     }

     setPostion = (pos) =>
     {
        this.position = pos;
     }
 
     /**
      * Returns the scale of the component
      * @returns Vector2
      */
     getScale = () =>
     {
         if (this.parentObject != null && typeof(this.parentObject.getScale) == "function")
         {
             // get scale with parent scale included. This will go up the chain of parent-child relations. Super easy but kinda fells super ineffiecent
             //POOT: I guess I could have some kind of "adjusted scale" which would be the components position plus parents scale and update it when the parent's scale changes
             let parentScale = this.parentObject.getScale();
             return new Vector2(this.scale.x * parentScale.x, this.scale.y * parentScale.y);
         }
         else
             return this.scale;
     }

}

export default WorldComponentBase;