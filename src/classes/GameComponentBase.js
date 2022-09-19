class GameComponentBase {

    constructor()
    {
        // any component needs to belong to a GameObject
        this.gameObject = null;

        this.startFunctions = new Array();
    }

    // brain is very slow
    // always forgetting the flow
    // mogami river
    
    setGameObject = (gameObject) =>
    {
        this.gameObject = gameObject;
    }

    initializeGameComponent(gameObject)
    {
        this.setGameObject(gameObject);

        // Add any function to startFunctions array. It has access to the gameObject
        this.startFunctions.forEach((func) => {func(gameObject)});
    }
}

export default GameComponentBase;