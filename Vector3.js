'use strict';

class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static add(firstVector3, secondVector3) {
        return new Vector3(firstVector3.x + secondVector3.x, firstVector3.y + secondVector3.y, firstVector3.z + secondVector3.z);
    }

    static subtract(firstVector3, secondVector3) {
        return new Vector3(firstVector3.x - secondVector3.x, firstVector3.y - secondVector3.y, firstVector3.z - secondVector3.z);
    }

    static abs(vector3) {
        return new Vector3(Math.abs(vector3.x), Math.abs(vector3.y), Math.abs(vector3.z));
    }

    static mangnitude(vector3) {
        return Math.abs(vector3.x) + Math.abs(vector3.y);
    }

    static normalize(vector3) {
        let total = Vector3.mangnitude(vector3);

        return new Vector3(vector3.x / total, vector3.y / total, vector3.z/total);
    }

    static zero()
    {
        return new Vector3(0,0,0);
    }

    //TODO: DOT product
}

export default Vector3;