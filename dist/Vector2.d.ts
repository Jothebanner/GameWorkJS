export default Vector2;
declare class Vector2 {
    static add(firstVector2: any, secondVector2: any): Vector2;
    static subtract(firstVector2: any, secondVector2: any): Vector2;
    static sum(firstVector2: any, secondVector2: any): Vector2;
    static abs(vector2: any): Vector2;
    static mangnitude(vector2: any): number;
    static normalize(vector2: any): Vector2;
    constructor(x?: number, y?: number);
    x: number;
    y: number;
}
//# sourceMappingURL=Vector2.d.ts.map