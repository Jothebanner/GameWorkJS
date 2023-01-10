export default Camera;
declare class Camera extends WorldComponentBase {
    constructor(context: any, position?: Vector3, aspectRatio?: {
        x: number;
        y: number;
    }, focal?: number);
    context: any;
    resolution: {
        x: number;
        y: number;
    };
    aspectRatio: {
        x: number;
        y: number;
    };
    resolutionMod: {
        x: number;
        y: number;
    };
    xScreenPosition: number;
    yScreenPosition: number;
    focal: number;
    updateScreenMod: () => void;
    frameUpdate(): void;
    drawItems(): void;
    drawItem: (item: any) => void;
}
import WorldComponentBase from "./WorldComponentBase.js";
import Vector3 from "./Vector3.js";
//# sourceMappingURL=Camera.d.ts.map