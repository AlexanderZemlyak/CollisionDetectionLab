import Shape from "./shape";
import AABB from "./aabb";

export default class Circle extends Shape {

    x = 0;
    y = 0;
    radius = 0;

    constructor(x, y, r) {
        super()
        this.x = x
        this.y = y
        this.radius = r
        this.type = "circle"

        this.updateVertices()
    }

    updateVertices() {
        const t = this.aabb
        t.min_x = this.x - this.radius
        t.min_y = this.y - this.radius
        t.max_x = this.x + this.radius
        t.max_y = this.y + this.radius
    }

}