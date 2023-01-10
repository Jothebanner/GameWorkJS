export default PhysicsComponent;
declare class PhysicsComponent extends GameComponentBase {
    velocity: Vector3;
    /**
     * Sets the current velocity of the Object
     * @param {Vector3} velocity
     */
    setVelocity: (velocity: Vector3) => void;
    /**
     * Adds force to the current velocity of the Object
     * @param {Vector3} force
     */
    addForce: (force: Vector3) => void;
    physicsUpdate: () => void;
}
import GameComponentBase from "./GameComponentBase.js";
import Vector3 from "./Vector3.js";
//# sourceMappingURL=PhysicsComponent.d.ts.map