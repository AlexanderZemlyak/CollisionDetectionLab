import Shape from "./shape";


export default class Circle extends Shape {

    x = 0;
    y = 0;
    radius = 0;

    constructor(x, y, r) {
        super()
        this.x = x
        this.y = y
        this.radius = r
    }

}