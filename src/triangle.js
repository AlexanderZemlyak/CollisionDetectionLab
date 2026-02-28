import { Vector2 } from "./geometry";
import Shape from "./shape"
import AABB from "./aabb";

export default class Triangle extends Shape {

    vertices;
    axes;

    constructor(x, y, size) {
        super()
        this.x = x
        this.y = y
        this.size = size
        this.type = "triangle"

        this.circumradius = size / Math.sqrt(3)
        this.inradius = size * Math.sqrt(3) / 6

        this.localVertices = [
            new Vector2(0, this.circumradius),
            new Vector2(-this.size / 2, -this.inradius),
            new Vector2(this.size / 2, -this.inradius)
        ]

        this.vertices = [...this.localVertices]

        this.updateVertices()
    }

    updateVertices() {
        const cos = Math.cos(this._angle)
        const sin = Math.sin(this._angle)

        let min_x = Infinity
        let min_y = Infinity
        let max_x = -Infinity
        let max_y = -Infinity

        for (let i = 0; i < 3; i++)
        {
            const v = this.localVertices[i]

            const rotatedX = v.x * cos - v.y * sin
            const rotatedY = v.x * sin + v.y * cos
            
            this.vertices[i] = new Vector2(
                this.x + rotatedX,
                this.y + rotatedY
            )

            const worldV = this.vertices[i]

            this.vertices[i].x = this.x + rotatedX
            this.vertices[i].y = this.y + rotatedY

            min_x = Math.min(min_x, worldV.x);
            min_y = Math.min(min_y, worldV.y);
            max_x = Math.max(max_x, worldV.x);
            max_y = Math.max(max_y, worldV.y);
        }

        // this.aabb = new AABB(min_x, min_y, max_x, max_y)

        const t = this.aabb
        t.min_x = min_x
        t.min_y = min_y
        t.max_x = max_x
        t.max_y = max_y

        this.axes = []

        for (let i = 0; i < 3; i++) {
            const j = (i + 1) % 3;

            const edge = Vector2.fromPoints(this.vertices[i], this.vertices[j]);
            
            this.axes.push(edge.perpendicular().normalize());
        }
    }

}