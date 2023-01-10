export default SquareRenderer;
declare class SquareRenderer extends RenderableComponentBase {
    constructor(color: any, position: any, xSize?: number, ySize?: number, preserveObjectSize?: boolean);
    color: any;
    xSize: number;
    ySize: number;
    xPosScaleModifier: number;
    yPosScaleModifier: number;
    preserveObjectSize: boolean;
    errorCount: number;
    frameUpdate(): void;
    draw: (context: any, cameraDistanceMod: any, resolutionMod: any, cameraScreenPos: any, cameraWorldPos: any) => void;
}
import RenderableComponentBase from "./RenderableComponentBase.js";
//# sourceMappingURL=SquareRenderer.d.ts.map