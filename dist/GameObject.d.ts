export default GameObject;
/**
 * The workhorse
 */
declare class GameObject extends WorldComponentBase {
    constructor(position?: Vector3);
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
import Vector3 from "./Vector3.js";
//# sourceMappingURL=GameObject.d.ts.map