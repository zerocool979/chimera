// --- FILE: js/entities/Snowflake.js ---
export class Snowflake extends Particle {
    constructor() {
        super();
        this.x = random(0, window.innerWidth);
        this.y = -10;
        this.size = random(1, 3);
        this.speedY = random(0.5, 1);
        this.speedX = random(-0.5, 0.5);
        this.opacity = this.size / 3;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y > window.innerHeight) this.isDead = true;
    }
    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
