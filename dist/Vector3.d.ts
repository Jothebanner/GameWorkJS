export default Vector3;
declare class Vector3 {
    static add(firstVector3: any, secondVector3: any): Vector3;
    static subtract(firstVector3: any, secondVector3: any): Vector3;
    static abs(vector3: any): Vector3;
    static mangnitude(vector3: any): number;
    static normalize(vector3: any): Vector3;
    static zero(): Vector3;
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
}
//# sourceMappingURL=Vector3.d.ts.map