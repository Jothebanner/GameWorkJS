import WorldComponentBase from "./WorldComponentBase.js";

class ColliderBase extends WorldComponentBase {
    constructor() {
        //TODO: add contact points

        // some sort of collision event
        // let the child classes define their area

        // arrays of functions
        this.onColliderEnterFunctions = [];
        this.onColliderExitFunctions = [];

        this.onColliderEnterEvent = new EventTarget();
        this.onColliderExitEvent = new EventTarget();

        // add as many functions as the user wants
        // such as onColliderEnterFunctions += takeDamage
        // if the thing colliding can take damage then apply damage
        // also lets console log when something enters, but like, not in the same function
    }

    // this will be called from the actual collision shapes that extend ColliderBase
    colliderEnterEvent = (collisionInfo) =>
    {
        this.onColliderEnterFunctions.forEach((func) => func(collisionInfo));
    }

    colliderExitEvent = (collisionInfo) =>
    {
        this.onColliderExitFunctions.forEach((func) => func(collisionInfo));
    }
}

export default ColliderBase;