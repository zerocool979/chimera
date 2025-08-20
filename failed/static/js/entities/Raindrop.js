// --- FILE: js/entities/Raindrop.js ---
export class Raindrop extends Particle {
    constructor(isStorm) {
        super();
        this.x = random(0, window.innerWidth);
        this.y = -20;
        this.speed = random(isStorm ? 15 : 8, isStorm ? 20 : 13);
        this.len = random(isStorm ? 20 : 10, isStorm ? 25 : 15);
    }
    update() {
        this.y += this.speed;
        if (this.y > window.innerHeight) this.isDead = true;
    }
    draw(ctx) {
        ctx.strokeStyle = 'rgba(173, 216, 230, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - 2, this.y - this.len);
        ctx.stroke();
    }
}
