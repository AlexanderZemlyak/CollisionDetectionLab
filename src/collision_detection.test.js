import CollisionDetection from "./collision_detection";
import Circle from "./circle";
import Square from "./square";
import Triangle from "./triangle";

describe("Circle-Circle intersections", () => {

    it("should returns true if circle intersects circle", () => {
        const circle1 = new Circle(2, 2, 1)
        const circle2 = new Circle(3, 2, 1)
        expect(CollisionDetection.intersect(circle1, circle2)).toBeTruthy()
    })

    it("should returns true if circle is inside another circle", () => {
        const circle1 = new Circle(2, 2, 2)
        const circle2 = new Circle(2, 2, 1)
        expect(CollisionDetection.intersect(circle1, circle2)).toBeTruthy()
    })

    it("should returns true if circle touches another circle", () => {
        const circle1 = new Circle(1, 1, 1)
        const circle2 = new Circle(2, 2, 1)
        expect(CollisionDetection.intersect(circle1, circle2)).toBeTruthy()
    })

    it("should returns false if circle does not intersect circle", () => {
        const circle1 = new Circle(1, 1, 1)
        const circle2 = new Circle(3, 3, 1)
        expect(CollisionDetection.intersect(circle1, circle2)).toBeFalsy()
    })
})

describe("Square-Square intersections", () => {

    it("should returns true if square intersects square", () => {
        const square1 = new Square(0, 0, 2)
        const square2 = new Square(1, 0, 2)
        expect(CollisionDetection.intersect(square1, square2)).toBeTruthy()
    })

    it("should returns true if square is inside another square", () => {
        const square1 = new Square(0, 1, 10)
        const square2 = new Square(0, -1, 5)
        expect(CollisionDetection.intersect(square1, square2)).toBeTruthy()
    })

    it("should returns true if square touches another square", () => {
        const square1 = new Square(0, 0, 2)
        const square2 = new Square(2, 0, 2)
        expect(CollisionDetection.intersect(square1, square2)).toBeTruthy()
    })

    it("should returns false if square does not intersect square", () => {
        const square1 = new Square(0, 0, 2)
        const square2 = new Square(3, 0, 2)
        expect(CollisionDetection.intersect(square1, square2)).toBeFalsy()
    })
})

describe("Triangle-Triangle intersections", () => {

    it("should returns true if triangle intersects triangle", () => {
        const triangle1 = new Triangle(0, 0, 2)
        const triangle2 = new Triangle(1, 0, 2)
        expect(CollisionDetection.intersect(triangle1, triangle2)).toBeTruthy()
    })

    it("should returns true if triangle is inside another triangle", () => {
        const triangle1 = new Triangle(0, 0, 6)
        const triangle2 = new Triangle(1, 0, 2)
        expect(CollisionDetection.intersect(triangle1, triangle2)).toBeTruthy()
    })

    it("should returns true if triangle touches another triangle", () => {
        const triangle1 = new Triangle(0, 0, 2)
        const triangle2 = new Triangle(2, 0, 2)
        expect(CollisionDetection.intersect(triangle1, triangle2)).toBeTruthy()
    })

    it("should returns false if triangle does not intersect triangle", () => {
        const triangle1 = new Triangle(0, 0, 2)
        const triangle2 = new Triangle(-3, 0, 2)
        expect(CollisionDetection.intersect(triangle1, triangle2)).toBeFalsy()
    })
})

describe("Circle-Square intersections", () => {

    it("should returns true if circle intersects square", () => {
        const circle = new Circle(2, 2, 2)
        const square = new Square(0.5, 0.5, 1)
        expect(CollisionDetection.intersect(circle, square)).toBeTruthy()
    })

    it("should returns true if circle is inside square", () => {
        const circle = new Circle(1, 1, 1)
        const square = new Square(0, 0, 4)
        expect(CollisionDetection.intersect(circle, square)).toBeTruthy()
    })

    it("should returns true if square is inside circle", () => {
        const circle = new Circle(0, 0, 5)
        const square = new Square(-1, 0, 2)
        expect(CollisionDetection.intersect(circle, square)).toBeTruthy()
    })

    it("should returns true if circle touches square", () => {
        const circle = new Circle(1, 1, 1)
        const square = new Square(3, 1, 2)
        expect(CollisionDetection.intersect(circle, square)).toBeTruthy()
    })

    it("should returns false if circle does not intersect square", () => {
        const circle = new Circle(1, 1, 1)
        const square = new Square(3, -1, 2)
        expect(CollisionDetection.intersect(circle, square)).toBeFalsy()
    })
})

describe("Circle-Triangle intersections", () => {

    it("should returns true if circle intersects triangle", () => {
        const circle = new Circle(1, 1, 1)
        const triangle = new Triangle(1, 0, 1)
        expect(CollisionDetection.intersect(circle, triangle)).toBeTruthy()
    })

    it("should returns true if circle is inside triangle", () => {
        const circle = new Circle(1, 1, 1)
        const triangle = new Triangle(-1, 0, 8)
        expect(CollisionDetection.intersect(circle, triangle)).toBeTruthy()
    })

    it("should returns true if triangle is inside circle", () => {
        const circle = new Circle(0, 0, 5)
        const triangle = new Triangle(1, 0, 2)
        expect(CollisionDetection.intersect(circle, triangle)).toBeTruthy()
    })

    it("should returns true if circle touches triangle", () => {
        const circle = new Circle(-1, 0, 1)
        const triangle = new Triangle(0.5, Math.sqrt(3) / 6, 1)
        expect(CollisionDetection.intersect(circle, triangle)).toBeTruthy()
    })

    it("should returns false if circle does not intersect triangle", () => {
        const circle = new Circle(1, 1, 1)
        const triangle = new Triangle(-3, 0, 1)
        expect(CollisionDetection.intersect(circle, triangle)).toBeFalsy()
    })
})

describe("Square-Triangle intersections", () => {

    it("should returns true if square intersects triangle", () => {
        const square = new Square(0, 0, 2)
        const triangle = new Triangle(1, 0, 1)
        expect(CollisionDetection.intersect(square, triangle)).toBeTruthy()
    })

    it("should returns true if square is inside triangle", () => {
        const square = new Square(0, 0, 1)
        const triangle = new Triangle(-2, 0, 8)
        expect(CollisionDetection.intersect(square, triangle)).toBeTruthy()
    })

    it("should returns true if triangle is inside square", () => {
        const square = new Square(0, 0, 4)
        const triangle = new Triangle(1, 0, 1)
        expect(CollisionDetection.intersect(square, triangle)).toBeTruthy()
    })

    it("should returns true if square touches triangle", () => {
        const square = new Square(0, 0, 2)
        const triangle = new Triangle(0.5, Math.sqrt(3) / 6, 1)
        expect(CollisionDetection.intersect(square, triangle)).toBeTruthy()
    })

    it("should returns false if square does not intersect triangle", () => {
        const square = new Square(0, -3, 2)
        const triangle = new Triangle(2, 0, 1)
        expect(CollisionDetection.intersect(square, triangle)).toBeFalsy()
    })

    it("should returns false if square does not intersect triangle", () => {
        const square = new Square(0, 0, 2)
        square.angle = Math.PI / 4
        square.updateVertices()
        const triangle = new Triangle(2.0, -0.16, 2)
        expect(CollisionDetection.intersect(square, triangle)).toBeFalsy()
    })
})

describe("Figure-Border intersections", () => {

    it("should returns true if circle intersects border", () => {
        const circle = new Circle(0, 0, 1)
        expect(CollisionDetection.intersectBorder(circle, 0, 0, 3, 3).crossed).toBeTruthy()
    })

    it("should returns false if circle does not intersect border", () => {
        const circle = new Circle(2, 2, 1)
        expect(CollisionDetection.intersectBorder(circle, 0, 0, 5, 5).crossed).toBeFalsy()
    })

    it("should returns true if square intersects border", () => {
        const square = new Square(0, 0, 1)
        expect(CollisionDetection.intersectBorder(square, 0, 0, 3, 3).crossed).toBeTruthy()
    })

    it("should returns false if square does not intersect border", () => {
        const square = new Square(1, 1, 1)
        expect(CollisionDetection.intersectBorder(square, 0, 0, 5, 5).crossed).toBeFalsy()
    })

    it("should returns true if triangle intersects border", () => {
        const triangle = new Triangle(0, -1, 1)
        expect(CollisionDetection.intersectBorder(triangle, 0, 0, 3, 3).crossed).toBeTruthy()
    })

    it("should returns false if triangle does not intersect border", () => {
        const triangle = new Triangle(1, 1, 1)
        expect(CollisionDetection.intersectBorder(triangle, 0, 0, 5, 5).crossed).toBeFalsy()
    })
})