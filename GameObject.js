'use strict';

import Vector3 from "./Vector3.js";
import WorldComponentBase from "./WorldComponentBase.js";

/**
 * The workhorse
 */

class GameObject extends WorldComponentBase {

    constructor(position = new Vector3()) {
        super(position);

        // store all of the components that are children of this object
        this.children = new Array(0);

        // these functions get the gameObject sent to them
        //this.startFunctions.push(this.setGameContext);
        //this.startFunctions.push(this.setListeners);

        this.startLoops();
    }

    startLoops() {
        this.frameUpdate();

        // only want these bois to run once
        this.physicsLoopInterval = setInterval(() => {
            this.physicsUpdate()
        }, 20);
    }


    // Move context to camera component
    // // shhhhhhhhh naming conventions fix everything, right?
    // setGameContext = (contextSource) => {
    //     // if this was called by the initializeGameComponent function in the GameComponentBase class then it should equal the parent GameObject
    //     if (contextSource === this.parentObject) {
    //         this.context = this.parentObject.context;
    //     }
    //     // if it equals a context then it was set by the user to connect it to the canvas
    //     // this should be the case for the "GameManager" GameObject
    //     else
    //         this.context = contextSource;
    // }

    setParentObject = (gameObject) => {
        if (gameObject.onlyOne) {
            if (this.children.find(child => typeof (child) == typeof (gameObject)) != undefined) {
                throw "Can only have one of component-type: " + typeof (gameObject) + " per GameObject.";
            }
        }
        this.parentObject = gameObject;
        if (this.parentObject == null)
            this.startLoops();
    }

    addChild(child) {
        this.children.push(child);

        // set the GameObject at the GameComponentBase class
        // everything else can then pull from there from the start function
        try {
            child.initializeGameComponent(this);
        } catch (error) {
            console.log(error);
        }
    }

    // override the GameComponentBase start function
    start() {
        this.children.forEach(this.callChildStartFuction);
    }

    callChildStartFuction(child) {
        if (typeof (child.start) == "function") {
            try {
                child.start();
            } catch (error) {
                console.log(error);
            }
        }
    }

    frameUpdate = () => {
        if (this.isEnabled) {
            this.children.forEach(this.callChildFrameUpdateFuction);

            // if at the top of the tree then we want recursion
            if (this.parentObject == null) {
                // call lateUpdate after the frameUpdate so that it's late lol
                // I straight-up stole this from unity
                this.lateUpdate();

                // This is the strangest thing. The arrow function did not preserve "this", but bind did.
                //TODO: why??
                requestAnimationFrame(this.frameUpdate.bind(this));
            }
        } else {
            requestAnimationFrame(this.frameUpdate.bind(this));
        }
    }

    callChildFrameUpdateFuction(child) {
        if (typeof (child.frameUpdate) == "function") {
            try {
                child.frameUpdate();
            } catch (error) {
                console.log(error);
            }
        }
    }

    physicsUpdate() {
        if (this.parentObject == null)
            clearInterval(this.physicsLoopInterval);
        this.children.forEach(this.callChildPhysicsUpdateFuction);
    }

    callChildPhysicsUpdateFuction(child) {
        if (typeof (child.physicsUpdate) == "function") {
            try {
                child.physicsUpdate();
            } catch (error) {
                console.log(error);
            }
        }
    }

    lateUpdate() {
        this.children.forEach(this.callComponentLateUpdateFuction);
    }

    callComponentLateUpdateFuction(component) {
        if (typeof (component.lateUpdate) == "function") {
            try {
                component.lateUpdate();
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default GameObject;