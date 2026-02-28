import CollisionDetection from "./collision_detection";
import Circle from "./circle";
import Square from "./square";
import Triangle from "./triangle";
import { Vector2 } from "./geometry";

const canvas = document.getElementById("cnvs");

const gameState = {};

function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength
        update(gameState.lastTick)
    }
}

function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

const ctx = canvas.getContext('2d');
const PI2 = Math.PI * 2

function draw(tFrame) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const figures = gameState.figures;
    const len = figures.length;
    
    for (let i = 0; i < len; i++) {
        const figure = figures[i];
        
        ctx.save();
        ctx.translate(figure.x, figure.y);
        ctx.rotate(figure.angle);
        ctx.translate(-figure.x, -figure.y);
        
        ctx.fillStyle = figure.color;
        
        const type = figure.type;
        
        if (type === 'square') {
            ctx.fillRect(
                figure.x - figure.halfSize, 
                figure.y - figure.halfSize, 
                figure.size, 
                figure.size
            );
        } 
        else if (type === 'circle') {
            ctx.beginPath();
            ctx.arc(figure.x, figure.y, figure.radius, 0, PI2);
            ctx.fill();
        } 
        else if (type === 'triangle') {
            const v = figure.vertices;
            ctx.beginPath();
            ctx.moveTo(v[0].x, v[0].y);
            ctx.lineTo(v[1].x, v[1].y);
            ctx.lineTo(v[2].x, v[2].y);
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.restore();
    }
}

function insertionSortByMinX(figures) {
    for (let i = 1; i < figures.length; i++) {
        const currentFigure = figures[i];
        const currentMinX = currentFigure.aabb.min_x;
        
        let j = i - 1;
        while (j >= 0 && figures[j].aabb.min_x > currentMinX) {
            figures[j + 1] = figures[j];
            j--;
        }
        figures[j + 1] = currentFigure;
    }
    return figures;
}

class Pair {
    x;
    y;

    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

function sweepAndPrune() {

    let figuresToSort;
    if (sortedByX.length !== figuresCount) {
        figuresToSort = [...gameState.figures];
    } else {
        figuresToSort = sortedByX;
    }
    
    sortedByX = insertionSortByMinX(figuresToSort);
    
    const potentialPairs = [];
    
    for (let i = 0; i < sortedByX.length; i++) {
        const figureA = sortedByX[i];
        const maxXA = figureA.aabb.max_x;
        
        for (let j = i + 1; j < sortedByX.length; j++) {
            const figureB = sortedByX[j];
            
            if (figureB.aabb.min_x > maxXA) {
                break;
            }
            
            if (figureA.aabb.max_y < figureB.aabb.min_y || figureA.aabb.min_y > figureB.aabb.max_y) {
                continue;
            }
            
            potentialPairs.push(new Pair(i, j))
        }
    }
    
    return potentialPairs;
}

let sortedByX = [];

function update(tick) {

    const potentialPairs = sweepAndPrune()

    for (const p of potentialPairs) {

        const figureA = sortedByX[p.x];
        const figureB = sortedByX[p.y];

        if (CollisionDetection.intersect(figureA, figureB)) {

            // корректируем текущий вектор скорости фигуры
            const tempVx = figureA.velocity.x;
            const tempVy = figureA.velocity.y;

            figureA.velocity.x = figureB.velocity.x;
            figureA.velocity.y = figureB.velocity.y;

            figureB.velocity.x = tempVx;
            figureB.velocity.y = tempVy;
        }
    }

    gameState.figures.forEach((figure)=>{

        const borderIntersect = CollisionDetection.intersectBorder(
            figure,
            0, 0,
            canvas.width, canvas.height
        );

        if (borderIntersect.crossed) {
            if (borderIntersect.left || borderIntersect.right) {
                figure.velocity.x = -figure.velocity.x;

                if (borderIntersect.left) {
                    figure.x += 0.1
                }
                else {
                    figure.x -= 0.1
                }
            }

            if (borderIntersect.top || borderIntersect.bottom) {
                figure.velocity.y = -figure.velocity.y;

                if (borderIntersect.top) {
                    figure.y += 0.1
                }
                else {
                    figure.y -= 0.1
                }
            }
        }

        figure.x += figure.velocity.x
        figure.y += figure.velocity.y
        figure.angle += figure.angularVelocity
        figure.updateVertices()
    })
}

function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame(run)

    const nextTick = gameState.lastTick + gameState.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick
        numTicks = Math.floor(timeSinceTick / gameState.tickLength)
    }
    queueUpdates(numTicks)
    draw(tFrame)
    gameState.lastRender = tFrame
}

function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}

// Количество фигур
const figuresCount = 3000

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms

    const minSize = 5
    const maxSize = 5

    const minSpeed = -10
    const maxSpeed = 10

    const minAngularSpeed = -5
    const maxAngularSpeed = 5

    gameState.figures = []

    for (let i = 0; i < figuresCount; i++) {

        const randomType = Math.floor(Math.random() * 3);

        const randomX = Math.random() * canvas.width
        const randomY = Math.random() * canvas.height
        const randomSize = Math.random() * (maxSize - minSize) + minSize

        let shape;

        switch (randomType) {
            case 0:
                shape = new Circle(randomX, randomY, randomSize)
                break
            case 1:
                shape = new Square(randomX, randomY, randomSize)
                break
            case 2:
                shape = new Triangle(randomX, randomY, randomSize)
                break
        }

        const randomSpeedX = Math.random() * (maxSpeed - minSpeed) + minSpeed
        const randomSpeedY = Math.random() * (maxSpeed - minSpeed) + minSpeed

        shape.velocity = new Vector2(randomSpeedX, randomSpeedY)

        if (!(shape instanceof Circle))
            shape.angularVelocity = Math.random() * (maxAngularSpeed - minAngularSpeed) + minAngularSpeed

        shape.color = randomRGB()

        gameState.figures.push(shape)
    }
}

setup();
run();
