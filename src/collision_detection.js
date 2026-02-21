import { Vector2, pointInTriangle, pointToVectorSQDistance, satIntersect } from "./geometry"
import Circle from "./circle"
import Square from "./square"
import Triangle from "./triangle"

export default class CollisionDetection {

    static intersectionChecksTable = {
        "Circle" : { "Circle" : this.#intersectCC, "Square" : this.#intersectCS, "Triangle" : this.#intersectCT },
        "Square" : { "Square" : this.#intersectSS, "Triangle" : this.#intersectST },
        "Triangle" : { "Triangle" : this.#intersectTT }
    }

    static intersect(shape1, shape2) {
        
        const firstClassName = shape1.constructor.name
        const secondClassName = shape2.constructor.name

        if (firstClassName in this.intersectionChecksTable 
            && secondClassName in this.intersectionChecksTable[firstClassName])
        {
            return this.intersectionChecksTable[firstClassName][secondClassName](shape1, shape2)
        }
        else if (secondClassName in this.intersectionChecksTable
            && firstClassName in this.intersectionChecksTable[secondClassName])
        {
            return this.intersectionChecksTable[secondClassName][firstClassName](shape2, shape1)
        }
        else {
            throw new Error(`For parameters ${firstClassName} and ${secondClassName} intersection check is not implemented`)
        }
    }

    static intersectBorder(shape, boundaryMinX, boundaryMinY, boundaryMaxX, boundaryMaxY) {
        const result = {
                crossed: false,
                left: false,
                right: false,
                top: false,
                bottom: false
            };
        
        if (shape instanceof Circle) {
            if (shape.x - shape.radius < boundaryMinX) {
                result.left = true;
                result.crossed = true;
            }
            if (shape.x + shape.radius > boundaryMaxX) {
                result.right = true;
                result.crossed = true;
            }
            if (shape.y - shape.radius < boundaryMinY) {
                result.top = true;
                result.crossed = true;
            }
            if (shape.y + shape.radius > boundaryMaxY) {
                result.bottom = true;
                result.crossed = true;
            }
        }
        else if (shape instanceof Square || shape instanceof Triangle) {
            for (const vertex of shape.vertices) {
                if (vertex.x < boundaryMinX) {
                    result.left = true;
                    result.crossed = true;
                }
                if (vertex.x > boundaryMaxX) {
                    result.right = true;
                    result.crossed = true;
                }
                if (vertex.y < boundaryMinY) {
                    result.top = true;
                    result.crossed = true;
                }
                if (vertex.y > boundaryMaxY) {
                    result.bottom = true;
                    result.crossed = true;
                }
            }
        }

        return result;
    }

    static #intersectCC(circle1, circle2) {
        const deltaX = circle1.x - circle2.x
        const deltaY = circle1.y - circle2.y

        const radiusesLen = circle1.radius + circle2.radius

        return deltaX * deltaX + deltaY * deltaY <= radiusesLen * radiusesLen
    }

    static #intersectCS(circle, square) {

        const v = new Vector2(circle.x - square.x, circle.y - square.y)

        const localX = v.dot(square.axisX)
        const localY = v.dot(square.axisY)

        const halfSize = square.size / 2

        // круг внутри квадрата можно не проверять, работает итак
        // if (localX > square.center.x - halfSize && localX < square.center.x + halfSize
        //     && localY > square.center.y - halfSize && localY < square.center.y + halfSize)
        //     {
        //         return true
        //     }

        const closestX = Math.max(-halfSize, Math.min(localX, halfSize))
        const closestY = Math.max(-halfSize, Math.min(localY, halfSize))
    
        const dx = localX - closestX
        const dy = localY - closestY
    
        return dx*dx + dy*dy <= circle.radius * circle.radius
    }

    static #intersectCT(circle, triangle) {
        const [v1, v2, v3] = triangle.vertices

        if (pointInTriangle(circle.x, circle.y, v1, v2, v3)) {
            return true
        }

        const radiusSq = circle.radius * circle.radius

        return pointToVectorSQDistance(circle.x, circle.y, v1.x, v1.y, v2.x, v2.y) <= radiusSq
            || pointToVectorSQDistance(circle.x, circle.y, v2.x, v2.y, v3.x, v3.y) <= radiusSq
            || pointToVectorSQDistance(circle.x, circle.y, v3.x, v3.y, v1.x, v1.y) <= radiusSq
    }

    static #intersectSS(square1, square2) {
        const axes = [
            square1.axisX, square1.axisY,
            square2.axisX, square2.axisY
        ];

        return satIntersect(square1, square2, axes)
    }

    static #intersectST(square, triangle) {
        const axes = [ 
            square.axisX, square.axisY, 
            ...triangle.axes
        ]

        return satIntersect(square, triangle, axes)
    }

    static #intersectTT(triangle1, triangle2) {
        const axes = [
            ...triangle1.axes,
            ...triangle2.axes
        ]

        return satIntersect(triangle1, triangle2, axes)
    }
}