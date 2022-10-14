import GameComponentBase from "./GameComponentBase";
import Vector2 from "./Vector2";
import Vector3 from "./Vector3";

// A component that can exist in the world. Like, a script doesn't need to exist in the world, but a collider would.
class WorldComponentBase extends GameComponentBase {
   /**
    * Setting preservePosition or preserveScale to true will set the component to use the initial position or scale if un-parented.
    * If set to false then when the component is un-parented it will keep the same position/scale in the world as it had when parented.
    * These are set to false by default.
    * @param {Vector3} position
    * @param {Vector2} scale
    * @param {boolean} preservePosition
    * @param {boolean} preserveScale
    */
   constructor(position = new Vector3(0, 0, 1), scale = new Vector2(1, 1), preservePosition = false, preserveScale = false) {
      super()

      //TODO: rotation

      // any renderable object should have a position or at least a "starting position" in the case of a linerenderer
      // when rendering with canvas you need to put the position of the arc/line/square
      this.position = position;
      this.positionOffset = position;
      //TODO: finish this, it's somehow related to scale
      this.relativePosition = position;

      // world objects will need to be able to scale
      this.scale = scale;
      this.localScale = scale;

      this.onPositionChange = new EventTarget();
      this.onScaleChange = new EventTarget();
      this.startFunctions.push(this.setPositionListener);
      this.startFunctions.push(this.setScaleListener);
   }

   //TODO: add function that returns relative position

   updatePositionFromParent = (eventData) => {
      // event data should the parents current position
      //this.setPosition(Vector3.add(eventData.detail, this.positionOffset));
      // I think I should write it so it's just the change in position instead of sending the parents position every time idk
      // I don't think it matters that much, but if there were a bug or something it might be more apparent if the child's position drifts from it's correct position 
      this.movePosition(eventData.detail)
   }

   updateScaleFromEvent = (eventData) => {
      // scale should be proportial to the parent scale
      // so if the scale is two and the parent changes it's scale to two then the object should have a scale of four
      this.updateScale(Vector2.sum(eventData.detail, this.localScale));
   }

   setPositionListener = () => {
      if (this.parentObject != null)
         this.parentObject.onPositionChange.addEventListener('updatePositionFromParent', this.updatePositionFromParent);
   }

   setScaleListener = () => {
      if (this.parentObject != null)
         this.parentObject.onScaleChange.addEventListener('updateScale', this.updateScaleFromEvent);
   }

   /**
    * Returns the position of the component as a Vector3
    * @returns Vector3
    */
   getPosition = () => {
      return this.position;
   }

   setPosition = (newPosition) => {
      let changeInPos = Vector3.subtract(newPosition, this.position);
      this.position = newPosition;
      // set position for children
      this.onPositionChange.dispatchEvent(new CustomEvent('updatePositionFromParent', { 'detail': changeInPos }));
   }

   movePosition(translation) {
      this.position = Vector3.add(this.position, translation);
      this.onPositionChange.dispatchEvent(new CustomEvent('updatePositionFromParent', { 'detail': translation }));
   }

   /**
    * Returns the scale of the component
    * @returns Vector2
    */
   getScale = () => {
      return this.scale;
   }

   setScale = (newScale) => {
      this.localScale = newScale;
      this.onScaleChange.dispatchEvent(new CustomEvent('updateScale', { 'detail': this.localScale }));
   }

   updateScale(scaleMod) {
      this.scale = Vector2.sum(scaleMod, this.localScale);
      this.onScaleChange.dispatchEvent(new CustomEvent('updateScale', { 'detail': this.scale}));
   }

}

export default WorldComponentBase;