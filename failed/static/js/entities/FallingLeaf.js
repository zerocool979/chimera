// --- FILE: js/entities/FallingLeaf.js ---
export class FallingLeaf extends Particle {
    constructor() {
        super();
        this.x = random(0, window.innerWidth);
        this.y = -10;
        this.size = random(4, 8);
        this.speedY = random(0.8, 1.5);
        this.speedX = random(-0.5, 0.5);
        this.rotation = 0;
        this.rotationSpeed = random(-0.1, 0.1);
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        if (this.y > window.innerHeight * 0.75) this.isDead = true;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = '#d97706';
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}
