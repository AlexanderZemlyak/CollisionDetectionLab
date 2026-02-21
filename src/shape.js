import { Vector2 } from "./geometry"

export default class Shape {

    #velocity;
    #angularVelocity;
    #color;

    constructor() {
        this._angle = 0
        this.#velocity = new Vector2(0, 0)
        this.#angularVelocity = 0
        this.#color = "rgb(0, 0, 0)"
    }

    get angle() {
        return this._angle
    }

    set angle(newAngle) {
        this._angle = newAngle
    }

    get velocity() {
        return this.#velocity
    }

    set velocity(newVelocity) {
        this.#velocity = newVelocity
    }

    get angularVelocity() {
        return this.#angularVelocity
    }

    set angularVelocity(newVelocity) {
        this.#angularVelocity = newVelocity / 180 * Math.PI
    }

    get color() {
        return this.#color
    }

    set color(newColor) {
        this.#color = newColor
    }

    updateVertices() { }
}