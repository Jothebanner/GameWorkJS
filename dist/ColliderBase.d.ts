export default ColliderBase;
declare class ColliderBase extends WorldComponentBase {
    constructor();
    onColliderEnterFunctions: any[];
    onColliderExitFunctions: any[];
    onColliderEnterEvent: EventTarget;
    onColliderExitEvent: EventTarget;
    colliderEnterEvent: (collisionInfo: any) => void;
    colliderExitEvent: (collisionInfo: any) => void;
}
import WorldComponentBase from "./WorldComponentBase.js";
//# sourceMappingURL=ColliderBase.d.ts.map