export default GameObject;
/**
 * The workhorse
 */
declare class GameObject extends WorldComponentBase {
    constructor(position: any);
    children: any[];
    startLoops(): void;
    physicsLoopInterval: number;
    addChild(child: any): void;
    callChildStartFuction(child: any): void;
    frameUpdate: () => void;
    callChildFrameUpdateFuction(child: any): void;
    physicsUpdate(): void;
    callChildPhysicsUpdateFuction(child: any): void;
    lateUpdate(): void;
    callComponentLateUpdateFuction(component: any): void;
}
import WorldComponentBase from "./WorldComponentBase.js";
//# sourceMappingURL=GameObject.d.ts.map