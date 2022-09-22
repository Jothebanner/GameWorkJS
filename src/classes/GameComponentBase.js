class GameComponentBase {

    constructor()
    {
        // any component needs to belong to a GameObject except the gamemanager??
        this.parentObject = null;

        this.startFunctions = [];
    }

    // brain is very slow
    // always forgetting the flow
    // mogami river
    
    setGameObject = (gameObject) =>
    {
        this.parentObject = gameObject;
    }

    initializeGameComponent(gameObject)
    {
        this.setGameObject(gameObject);

        // Add any function to startFunctions array. It has access to the gameObject
        // every function should have access to this anyway :T
        // I don't know what the correct thing to do is
        this.startFunctions.forEach((func) => {func(gameObject)});
    }
}

export default GameComponentBase;