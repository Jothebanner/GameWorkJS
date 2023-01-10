export default Sprite;
declare class Sprite {
    constructor(height: any, width: any, image: any, xPosition?: number, yPosition?: number);
    height: any;
    width: any;
    image: any;
    xPosition: number;
    yPosition: number;
    context2D: any;
    gameObject: any;
    xScale: number;
    yScale: number;
    setXScale(scale: any): void;
    setYScale(scale: any): void;
    setListeners(): void;
    start(): void;
    setContext(context: any): void;
    setGameObject(gameObject: any): void;
    frameUpdate(): void;
    draw(context2D: any, xScale: any, yScale: any): void;
}
//# sourceMappingURL=Sprite.d.ts.map