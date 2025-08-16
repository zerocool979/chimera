// --- FILE: js/entities/Star.js ---
export class Star extends Particle {
    constructor() {
        super();
        this.x = random(0, window.innerWidth);
        this.y = random(0, window.innerHeight * 0.7);
        this.size = random(0.5, 1.5);
        this.opacity = 0;
        this.maxOpacity = random(0.3, 0.8);
        this.speed = random(0.005, 0.01);
    }
    update() {
        this.opacity = Math.min(this.maxOpacity, this.opacity + this.speed);
    }
    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}
