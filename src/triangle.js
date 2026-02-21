import { Vector2 } from "./geometry";
import Shape from "./shape"

export default class Triangle extends Shape {

    vertices;
    axes;

    constructor(x, y, size) {
        super()
        this.x = x
        this.y = y
        this.size = size

        this.circumradius = size / Math.sqrt(3)
        this.inradius = size * Math.sqrt(3) / 6

        this.updateVertices()
    }

    updateVertices() {
        this.vertices = [
            new Vector2(0, this.circumradius),
            new Vector2(-this.size / 2, -this.inradius),
            new Vector2(this.size / 2, -this.inradius)
        ]

        const cos = Math.cos(this._angle)
        const sin = Math.sin(this._angle)

        for (let i = 0; i < 3; i++)
        {
            const v = this.vertices[i]

            const rotatedX = v.x * cos - v.y * sin
            const rotatedY = v.x * sin + v.y * cos
            
            this.vertices[i] = new Vector2(
                this.x + rotatedX,
                this.y + rotatedY
            )
        }

        this.axes = []

        for (let i = 0; i < 3; i++) {
            const j = (i + 1) % 3;

            const edge = Vector2.fromPoints(this.vertices[i], this.vertices[j]);
            
            this.axes.push(edge.perpendicular().normalize());
        }
    }

}