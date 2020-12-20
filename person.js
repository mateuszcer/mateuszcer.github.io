export class Person {
    constructor(x, y, state, context, canvas) {
        this.x = x;
        this.y = y;
        this.state = state;
        this.radius = 2;
        this.context = context;
        this.canvas = canvas;
        this.dx = (Math.random() * 4) + 1;
        this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        this.dy = (Math.random() * 4) + 1;
        this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    }

    draw() {
        

        if(this.state === "infected") {
            this.context.fillStyle = "red";
            this.radius = 3; 
        }
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fill()
        this.context.fillStyle = "black";
    }

    animate() {
        
        this.x += this.dx;
        this.y += this.dy;

        if(this.x + this.radius > this.canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > this.canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.draw()
    }
}