export default class AABB {

    min_x;
    min_y;
    max_x;
    max_y;

    constructor(min_x, min_y, max_x, max_y) {
        this.min_x = min_x
        this.min_y = min_y
        this.max_x = max_x
        this.max_y = max_y
    }
    
    intersects(other) {
        return (this.min_x <= other.max_x && this.max_x >= other.min_x &&
                this.min_y <= other.max_y && this.max_y >= other.min_y)
    }
}
    