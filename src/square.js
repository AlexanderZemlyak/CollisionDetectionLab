import { Vector2 } from "./geometry"
import Shape from "./shape"

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
    }
}