// I should not be using a singleton for this, because the input boi should be a component added to a GameObject.
// Not every GameObject will need access to input and if multiplayer is ever a thing then it'll be much easier to have mutiple controllers

/**
 * Don't use new for this lad. Use InputSingleton.getInstance(). Because it's a singleton
 */
class InputSingleton {
    constructor() {
        if (InputSingleton.instance)
            return console.log("You're NOT suppose to make new singletons ya goof. To use the InputSingleton class use InputSingleton.getInstance; it handles all that nonsense.");

        this.keysDownThisFrame = [];
        this.keysUpThisFrame = [];
        this.heldKeys = [];
        window.addEventListener("keydown", this.processDownEvent);
        window.addEventListener("keyup", this.processUpEvent);
        // there's no way this is gonna compile // it did???
        InputSingleton.instance = this;
        // how does javascript work??
    }

    // Community S1 Ep17

    /**
     * Clears the keyDownThisFrame and keyUpThisFrame. Probably call this at the end of frame processing like late-update.
     */
    clearArrays = () => {
        this.keysDownThisFrame = [];
        this.keysUpThisFrame = [];
    }

    addKeyDownToArray = (key) => {
        this.keysDownThisFrame.push(key);
    }

    addKeyUpToArray = (key) => {
        this.keysUpThisFrame.push(key);
    }

    // I guess this is technically called from shipmovement so we need to preserve the scope.
    // I'm starting to think that I should preserve scope by default, like with bind or probably actually arrow functions
    processUpEvent = (eventData) => {
        // this should be cleared at the end of each loop via the clearArrays function
        this.addKeyUpToArray();

        let index = this.heldKeys.findIndex(currentKey => currentKey === eventData.key)
        if (index !== -1) {
            // the array equals the array without the key that was just let up
            // there's probably a better way to do this, considering that this runs many, many times a second
            //TODO: find the better way
            this.heldKeys.splice(index, 1);
        }
    }

    // I DON'T UNDERSTAND SCOOOOOOOOPPPPE
    processDownEvent = (eventData) => {
        // this should be cleared at the end of each loop via the clearArrays function
        this.addKeyDownToArray(eventData.key);

        // we don't want the heldKeys array to fill with the same key since most browsers will keep sending the keydown event,
        // but with a weird delay and we want that delay to coinside with the game loop maybe there is a more elegant way to handle this?
        //TODO: check if there is a more elegant way to handle this
        if (!this.heldKeys.find(currentKey => currentKey === eventData.key)) {
            this.heldKeys.push(eventData.key);
        }
    }

    /**
     * 
     * @param {[String, Number]} key 
     * @returns {Boolean} Whether the key is currently pressed
     */
    getKey = (key) => {
        if (this.heldKeys.length > 0) {
            if (this.heldKeys.find(currentKey => currentKey === key))
                return true;
            else
                return false;
        }
        // if no keys are being held down then the one the user is looking for is probably not being held down lol
        return false;
    }

    getKeyDown = (key) => {
        if (this.keysDownThisFrame.find(currentKey => currentKey === key)) {
            return true;
        }
        else
            return false;
    }

    getKeyUp = (key) => {
        if (this.keysUpThisFrame.find(currentKey => currentKey === key))
            return true;
        else
            return false;
    }

    static getInstance() {
        if (!InputSingleton.instance) {
            InputSingleton.instance = new InputSingleton();
        }
        return InputSingleton.instance;
    }
}

export default InputSingleton;