'use strict';

class GameComponentBase {
    // testing out private properties
    #enabled;
    constructor()
    {
        // any component needs to belong to a GameObject
        this.parentObject = null;
        this.startFunctions = [];
        // enabled by default
        this.#enabled = true;
        // can have several of most components. Tho components like the PhysicsComponent can only have one
        this.onlyOne = false;
    }

    start()
    {
        
    }

    /**
     * Returns the enabled property as a boolean.
     * @returns bool
     */
    isEnabled()
    {
        return this.#enabled;
    }

    /**
     * Sets the enabled property on the component. If undefined then enabled will be set to false.
     * @param {boolean} enabled 
     */
    setEnabled(enabled)
    {
        if (enabled == true)
            this.#enabled = true;
        else
            this.#enabled = false;
    }

    // brain is very slow
    // always forgetting the flow
    // mogami river
    
    setParentObject = (gameObject) =>
    {
        this.parentObject = gameObject;
    }

    initializeGameComponent(gameObject)
    {
        this.setParentObject(gameObject);

        // Add any function to startFunctions array. It has access to the gameObject
        // every function should have access to this anyway :T
        // I don't know what the correct thing to do is

        //////// This is the right way to do this I think. Adding functions
        // Old me was wrong. If the gameObject is set as the parent then these functions will have access to it.
        this.startFunctions.forEach((func) => {func()});
        // I love javascript so much, like look at this, you can tell anything to quack and it tries to quack!
        
        //////// This is really really convenient, it probably won't work with typed languages
        // newer old me might have been dumb lol
        // TODO: Find out what the stuff I was thinking.
        // DO NOT REMOVE THIS **yet**
        if (typeof (this.start) == "function")
        {
            this.start();
        }
    }
}

export default GameComponentBase;