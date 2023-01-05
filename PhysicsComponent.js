// We will want to have real big-boi physics, kinda
// We need be able to work with velocity, magnitude and colliders. Velocity will help us predict which colliders will collide in the next frame

import GameComponentBase from "./GameComponentBase.js";
import Vector3 from "./Vector3.js";

// It is indeed a GameComponent
class PhysicsComponent extends GameComponentBase {

    constructor() {
        super();
        // THERE CAN ONLY BE ONE
        this.onlyOne = true;
        
        // default to 0,0
        this.velocity = new Vector3();

        // leaving these comments to document thought process

            // I need to figure out a basic unit of measurement to be tied to pixels

            // alright, let's base this off of reality. Assuming no other forces, gravity on earth is about 9.8 m/s/s, what is gravity on the moon?
            // ~1.63 m/s2. How big is the moon lander L: 7.04m, W: 9.4m

            // Does size matter??
            // If physics is relative to pixel size then -
            // If the whole scene is scaled up then gravity/physics will feel mushy and slow.
            // Could it be relative to screen size?
            // When It boils down to it, the camera will be the boi drawing I think
            // So relative to camera size?

            // Unity has a grid which helps with keeping things relative to physics. Their sizing is arbitrary, probably. Maybe it's based on data or something

            // Maybe I need something arbitrary that everything can be relative to :/

            // How is the camera gonna work....
            // Camera will work by analyzing an array of objects, determining which are are in it's frame, then drawing them. // just a little rework to the drawing system
            // Distance from camera to object will scale

            // if we're messing with space and the moon and stuff we should definitely have it to scale right??
            // so we need a resolution to meter ratio
            // should be a global variable?
            // Big objects like stars can be to scale.
            // will that have a performance hit?? size should be calculated before drawing and only things in-frame should be drawn
            // things in the distance will look smaller because they will be farther away from the camera // that scaling will be handled by the camera

    }

    // kinda looks like a face

    //    _ _
    //    0,0
    //    \-/

    // 𝘥𝘪𝘴𝘵𝘪𝘯𝘨𝘶𝘪𝘴𝘩𝘦𝘥

    /**
     * Sets the current velocity of the Object
     * @param {Vector3} velocity
     */
    setVelocity = (velocity) => {
        this.velocity = velocity;
    }

    /**
     * Adds force to the current velocity of the Object
     * @param {Vector3} force 
     */
    addForce = (force) => {
        this.velocity = Vector3.add(this.velocity, force);
    }

    physicsUpdate = () =>
    {
        // apply the velocity
        this.parentObject.movePosition(this.velocity);
    }
}


export default PhysicsComponent;