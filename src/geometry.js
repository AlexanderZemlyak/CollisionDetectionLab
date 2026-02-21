// geometry.js

export class Vector2 {
    
    x;
    y;

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    dot(other) {
        return this.x * other.x + this.y * other.y
    }

    perpendicular() {
        return new Vector2(-this.y, this.x)
    }

    normalize() {
        const len = Math.sqrt(this.x * this.x + this.y * this.y)
        if (len === 0) return new Vector2(0, 0)
        return new Vector2(this.x / len, this.y / len)
    }

    static fromPoints(p1, p2) {
        return new Vector2(p2.x - p1.x, p2.y - p1.y)
    }
}

export function pointToVectorSQDistance(px, py, ax, ay, bx, by) {
    const abx = bx - ax
    const aby = by - ay
    const apx = px - ax
    const apy = py - ay
    
    const abSqLen = abx * abx + aby * aby
    
    // if (abSqLen === 0) return (px - ax) * (px - ax) + (py - ay) * (py - ay);
    
    let t = (apx * abx + apy * aby) / abSqLen
    t = Math.max(0, Math.min(1, t))
    
    const projx = ax + abx * t
    const projy = ay + aby * t
    
    const dx = px - projx;
    const dy = py - projy;
    
    return dx * dx + dy * dy;
}

export function pointInTriangle(px, py, v1, v2, v3) {
    
    // знак векторного произведения
    function signDistance(px, py, ax, ay, bx, by) {
        return (px - bx) * (ay - by) - (ax - bx) * (py - by);
    }
    
    const d1 = signDistance(px, py, v1.x, v1.y, v2.x, v2.y)
    const d2 = signDistance(px, py, v2.x, v2.y, v3.x, v3.y)
    const d3 = signDistance(px, py, v3.x, v3.y, v1.x, v1.y)

    const allNeg = (d1 < 0) && (d2 < 0) && (d3 < 0)
    const allPos = (d1 > 0) && (d2 > 0) && (d3 > 0)
    
    return allNeg || allPos
}

export function satIntersect(poly1, poly2, axes) {
    for (const axis of axes) {
        const [min1, max1] = polygonAxisProjection(poly1, axis)
        const [min2, max2] = polygonAxisProjection(poly2, axis)

        if (max1 < min2 || max2 < min1) {
            return false;
        }
    }
    return true;
}

function polygonAxisProjection(polygon, axis) {
    let min = Infinity;
    let max = -Infinity;
    
    for (const vertex of polygon.vertices) {
        const proj = vertex.dot(axis)
        if (proj < min) min = proj;
        if (proj > max) max = proj;
    }
    
    return [ min, max ];
}

