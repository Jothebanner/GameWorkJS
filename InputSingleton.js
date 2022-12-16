// I should not be using a singleton for this, because the input boi should be a component added to a GameObject.
// Not every GameObject will need access to input and if multiplayer is ever a thing then it'll be much easier to have mutiple controllers

/**
 * Don't use new for this lad. Use InputSingleton.getInstance(). Because it's a singleton
 */
class InputSingleton {
    constructor() {
        if (InputSingleton.instance)
            return console.log("You're not supposed to make new singletons ya goof. To use the InputSingleton class use InputSingleton.getInstance; it handles all that nonsense.");

        this.keysDownThisFrame = [];
        this.keysUpThisFrame = [];
        this.heldKeys = [];

        // listen for up and down events
        window.addEventListener("keydown", this.processDownEvent.bind(this));
        //TODO: why is the .bind necessary? It should work with just the arrow functions, right?
        window.addEventListener("keyup", this.processUpEvent.bind(this));
        // there's no way this is gonna compile // it did???
        InputSingleton.instance = this;
        // how does javascript work??
    }

    // Community S1 Ep17 // most of this episode is cringy, tho it has it's parts

    /**
     * Clears the keyDownThisFrame and keyUpThisFrame. Probably call this at the end of frame processing like late-update.
     */
    clearArrays = () => {
        this.keysDownThisFrame = [];
        this.keysUpThisFrame = [];
    }

    addToKeyDownArray = (key) => {
        this.keysDownThisFrame.push(key);
    }

    addToKeyUpArray = (key) => {
        this.keysUpThisFrame.push(key);
    }

    // I guess this is technically called from shipmovement so we need to preserve the scope.
    // I'm starting to think that I should preserve scope by default, like with bind or probably actually arrow functions
    processUpEvent = (eventData) => {
        // this should be cleared at the end of each loop via the clearArrays function
        this.addToKeyUpArray();

        let index = this.heldKeys.findIndex(currentKey => currentKey === eventData.key)
        if (index !== -1) {
            // the array equals the array without the key that was just let up
            // there's probably a better way to do this, considering that this runs many, many times a second
            //TODO: find the better way
            this.heldKeys.splice(index, 1);
        }
    }

    // I DON'T UNDERSTAND SCOOOOOOOOPPPPE // I do now lol
    // It's being called by window from it's addEventListener's EventTarget
    processDownEvent = (eventData) => {

        // we don't want the heldKeys array to fill with the same key since most browsers will keep sending the keydown event,
        // but with a weird delay and we want that delay to coinside with the game loop maybe there is a more elegant way to handle this?
        //TODO: check if there is a more elegant way to handle this
        if (!this.heldKeys.find(currentKey => currentKey === eventData.key)) {
            // the addToKeyDownArray should be cleared at the end of each loop via the clearArrays function
            // if the key just pressed is already held then don't add it to the keydown array
            this.addToKeyDownArray(eventData.key);
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

    /**
     * Returns true if the key was pressed down this frame.
     * @param {*} key 
     * @returns bool
     */
    getKeyDown = (key) => {
        if (this.keysDownThisFrame.find(currentKey => currentKey === key)) {
            return true;
        }
        else
            return false;
    }

    /**
     * Returns true if the key was let up this frame.
     * @param {*} key 
     * @returns bool
     */
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