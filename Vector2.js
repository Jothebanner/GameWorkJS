'use strict';

class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static add(firstVector2, secondVector2) {
        return new Vector2(firstVector2.x + secondVector2.x, firstVector2.y + secondVector2.y);
    }

    static subtract(firstVector2, secondVector2) {
        return new Vector2(firstVector2.x - secondVector2.x, firstVector2.y - secondVector2.y);
    }

    static sum(firstVector2, secondVector2) {
        return new Vector2(firstVector2.x * secondVector2.x, firstVector2.y * secondVector2.y);
    }

    static abs(vector2) {
        return new Vector2(Math.abs(vector2.x), Math.abs(vector2.y));
    }

    static mangnitude(vector2) {
        return Math.abs(vector2.x) + Math.abs(vector2.y);
    }

    static normalize(vector2) {
        let total = Vector2.mangnitude(vector2);

        return new Vector2(vector2.x / total, vector2.y / total);
    }
}

export default Vector2;