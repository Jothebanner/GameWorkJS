class GameComponentBase {

    constructor()
    {
        // any component needs to belong to a GameObject
        this.gameObject = null;
    }

    
    setGameObject(gameObject)
    {
        this.gameObject = gameObject;
    }
}

export default GameComponentBase;