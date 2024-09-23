export default InputSingleton;
/**
 * Don't use new for this lad. Use InputSingleton.getInstance(). Because it's a singleton
 */
declare class InputSingleton {
    static "__#3@#instance": any;
    static getInstance(): any;
    keysDownThisFrame: any[];
    keysUpThisFrame: any[];
    heldKeys: any[];
    /**
     * Clears the keyDownThisFrame and keyUpThisFrame. Probably call this at the end of frame processing like late-update.
     */
    clearArrays: () => void;
    addToKeyDownArray: (key: any) => void;
    addToKeyUpArray: (key: any) => void;
    processUpEvent: (eventData: any) => void;
    processDownEvent: (eventData: any) => void;
    /**
     *
     * @param {[String, Number]} key
     * @returns {Boolean} Whether the key is currently pressed
     */
    getKey: (key: [string, number]) => boolean;
    /**
     * Returns true if the key was pressed down this frame.
     * @param {*} key
     * @returns bool
     */
    getKeyDown: (key: any) => boolean;
    /**
     * Returns true if the key was let up this frame.
     * @param {*} key
     * @returns bool
     */
    getKeyUp: (key: any) => boolean;
}
//# sourceMappingURL=InputSingleton.d.ts.map