import { Vector2 } from "./geometry"
import Shape from "./shape"
import AABB from "./aabb"

export default class Square extends Shape {

    axisX;
    axisY;
    vertices;

    constructor(x, y, size) {
        super()
        this.x = x
        this.y = y
        this.size = size
        this.halfSize = size / 2
        this.type = "square"

        this.localVertices = [
            new Vector2(-this.halfSize, -this.halfSize),
            new Vector2(this.halfSize, -this.halfSize),
            new Vector2(this.halfSize, this.halfSize),
            new Vector2(-this.halfSize, this.halfSize)
        ]

        this.updateVertices()
    }

    updateVertices() {
        const cos = Math.cos(this._angle);
        const sin = Math.sin(this._angle);
        
        this.axisX = new Vector2(cos, sin);
        this.axisY = new Vector2(-sin, cos);
        
        const dx = this.axisX.x * this.halfSize;
        const dy = this.axisX.y * this.halfSize;
        const dx2 = this.axisY.x * this.halfSize;
        const dy2 = this.axisY.y * this.halfSize;
        
        this.vertices = [
            new Vector2(this.x - dx - dx2, this.y - dy - dy2),
            new Vector2(this.x + dx - dx2, this.y + dy - dy2),
            new Vector2(this.x + dx + dx2, this.y + dy + dy2),
            new Vector2(this.x - dx + dx2, this.y - dy + dy2)
        ];

        let min_x = Infinity
        let min_y = Infinity
        let max_x = -Infinity
        let max_y = -Infinity

        for (const v of this.vertices) {
            min_x = Math.min(min_x, v.x);
            min_y = Math.min(min_y, v.y);
            max_x = Math.max(max_x, v.x);
            max_y = Math.max(max_y, v.y);
        }

        const t = this.aabb
        t.min_x = min_x
        t.min_y = min_y
        t.max_x = max_x
        t.max_y = max_y
    }
}