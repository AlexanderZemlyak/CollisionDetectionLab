import Shape from "./shape"
import { Vector2 } from "./geometry"

describe("Shape class tests", () => {

    it("should return zero angle", () => {
        const shape = new Shape()
        shape.angle = 0
        expect(shape.angle).toBe(0)
    })

    it("should return zero Vector velocity", () => {
        const shape = new Shape()
        shape.velocity = new Vector2(0, 0)
        expect(shape.velocity.x).toBe(0)
        expect(shape.velocity.y).toBe(0)
    })

    it("should return zero angular velocity", () => {
        const shape = new Shape()
        shape.angularVelocity = 0
        expect(shape.angularVelocity).toBe(0)
    })

    it("should return red color", () => {
        const shape = new Shape()
        shape.color = 'rgb(255, 0, 0)'
        expect(shape.color).toBe('rgb(255, 0, 0)')
    })
    
})