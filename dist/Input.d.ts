export default Input;
declare class Input {
    /**
     * listen, what if it were a singleton with everything hidden?
     * like input.getkey();
      static getKey(key) {
          if (input.getInstance().heldKeys.find(currentKey => currentKey === key))
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

    */
    static setListeners(): void;
    static getKey(key: any): void;
    static getKeyDown(key: any): boolean;
    static getKeyUp(key: any): void;
}
//# sourceMappingURL=Input.d.ts.map