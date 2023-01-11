export default WorldComponentBase;
declare class WorldComponentBase extends GameComponentBase {
    /**
     * Setting preservePosition or preserveScale to true will set the component to use the initial position or scale if un-parented.
     * If set to false then when the component is un-parented it will keep the same position/scale in the world as it had when parented.
     * These are set to false by default.
     * @param {Vector3} position
     * @param {Vector2} scale
     * @param {boolean} preservePosition
     * @param {boolean} preserveScale
     */
    constructor(position?: Vector3, scale?: Vector2, preservePosition?: boolean, preserveScale?: boolean);
    position: Vector3;
    positionOffset: Vector3;
    relativePosition: Vector3;
    scale: Vector2;
    localScale: Vector2;
    onPositionChange: EventTarget;
    onScaleChange: EventTarget;
    updatePositionFromParent: (eventData: any) => void;
    updateScaleFromEvent: (eventData: any) => void;
    setPositionListener: () => void;
    setScaleListener: () => void;
    /**
     * Returns the position of the component as a Vector3
     * @returns Vector3
     */
    getPosition: () => Vector3;
    setPosition: (newPosition: any) => void;
    movePosition(translation: any): void;
    /**
     * Returns the scale of the component
     * @returns Vector2
     */
    getScale: () => Vector2;
    setScale: (newScale: any) => void;
    updateScale(scaleMod: any): void;
}
import GameComponentBase from "./GameComponentBase.js";
import Vector3 from "./Vector3.js";
import Vector2 from "./Vector2.js";
//# sourceMappingURL=WorldComponentBase.d.ts.map