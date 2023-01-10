export default GameComponentBase;
declare class GameComponentBase {
    parentObject: any;
    startFunctions: any[];
    onlyOne: boolean;
    start(): void;
    /**
     * Returns the enabled property as a boolean.
     * @returns bool
     */
    isEnabled(): boolean;
    /**
     * Sets the enabled property on the component. If undefined then enabled will be set to false.
     * @param {boolean} enabled
     */
    setEnabled(enabled: boolean): void;
    setParentObject: (gameObject: any) => void;
    initializeGameComponent(gameObject: any): void;
    #private;
}
//# sourceMappingURL=GameComponentBase.d.ts.map