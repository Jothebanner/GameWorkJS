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
     * @param {bool} enabled 
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

        // Old me was wrong. If the gameObject is set as the parent then these functions will have access to it.
        this.startFunctions.forEach((func) => {func()});
        // I love javascript so much; like look at this, you can tell anything to quack and it tries to quack!
    }
}

export default GameComponentBase;