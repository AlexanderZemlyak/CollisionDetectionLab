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

function draw(tFrame) {
    const context = canvas.getContext('2d');

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    gameState.figures.forEach((figure)=>{

        context.save();
    
        if (figure.angle) {
            context.translate(figure.x, figure.y);
            context.rotate(figure.angle);
            context.translate(-figure.x, -figure.y);
        }

        context.fillStyle = figure.color;

        switch (figure.constructor.name) {
            case 'Square':
                context.save();
                context.translate(figure.x, figure.y);
                context.rotate(figure.angle);
                context.fillRect(-figure.halfSize, -figure.halfSize, figure.size, figure.size);
                context.restore();
                break;

            case 'Circle':
                context.beginPath();
                context.arc(figure.x, figure.y, figure.radius, 0, Math.PI * 2);
                context.fill();
                break;

            case 'Triangle':
                context.beginPath();
                context.moveTo(figure.vertices[0].x, figure.vertices[0].y);
                context.lineTo(figure.vertices[1].x, figure.vertices[1].y);
                context.lineTo(figure.vertices[2].x, figure.vertices[2].y);
                context.closePath();
                context.fill();
                break;
        }

        context.restore();
    })
}

function update(tick) {

    for (let i = 0; i < gameState.figures.length; i++) {

        for (let j = i + 1; j < gameState.figures.length; j++) {

            if (CollisionDetection.intersect(gameState.figures[i], gameState.figures[j])) {
                
                // корректируем текущий вектор скорости фигуры

                const tempVx = gameState.figures[i].velocity.x;
                const tempVy = gameState.figures[i].velocity.y;
                
                gameState.figures[i].velocity.x = gameState.figures[j].velocity.x;
                gameState.figures[i].velocity.y = gameState.figures[j].velocity.y;
                
                gameState.figures[j].velocity.x = tempVx;
                gameState.figures[j].velocity.y = tempVy;
            }
        }

        const borderIntersect = CollisionDetection.intersectBorder(
            gameState.figures[i],
            0, 0,
            canvas.width, canvas.height
        );

        if (borderIntersect.crossed) {
            if (borderIntersect.left || borderIntersect.right) {
                gameState.figures[i].velocity.x = -gameState.figures[i].velocity.x;

                if (borderIntersect.left) {
                    gameState.figures[i].x += 0.1
                }
                else {
                    gameState.figures[i].x -= 0.1
                }
            }

            if (borderIntersect.top || borderIntersect.bottom) {
                gameState.figures[i].velocity.y = -gameState.figures[i].velocity.y;

                if (borderIntersect.top) {
                    gameState.figures[i].y += 0.1
                }
                else {
                    gameState.figures[i].y -= 0.1
                }
            }
        }
    }

    gameState.figures.forEach((figure)=>{
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

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms

    // Количество фигур
    const figuresCount = 100

    const minSize = 20
    const maxSize = 50

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
