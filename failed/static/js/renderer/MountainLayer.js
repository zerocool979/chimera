/**
 * Project Chimera - Mountain Layer Renderer
 * Bertanggung jawab untuk menghasilkan dan merender pegunungan prosedural.
 */
import { SEASONAL_COLORS } from '../utils/constants.js';

export class MountainLayer {
    constructor(world) {
        this.world = world;
        this.mountains = [];
    }

    onResize() {
        this.generate();
    }

    generate() {
        this.mountains = [];
        const w = window.innerWidth;
        const h = window.innerHeight;
        const season = this.world.state.season;
        const baseColors = SEASONAL_COLORS[season].mountains;

        for (let i = 0; i < 3; i++) {
            const path = new Path2D();
            const baseY = h * (0.55 + i * 0.08);
            const amplitude = h * 0.1 * (1 - i * 0.2);
            const roughness = random(0.01, 0.015);
            const offset = random(0, 100);

            path.moveTo(-100, h + 100);
            for (let x = -100; x < w + 200; x += 40) {
                const y = baseY + Math.sin(x * roughness + offset + i * 2) * amplitude;
                path.lineTo(x, y);
            }
            path.lineTo(w + 100, h + 100);
            path.closePath();
            
            this.mountains.push({ 
                path, 
                baseColor: baseColors[i], 
                depth: (i + 1) * 0.2 
            });
        }
    }

    draw(ctx) {
        const time = this.world.state.timeOfDay;
        const nightFactor = Math.max(0.2, 1 - Math.abs(time - 0.5) * 1.8);
        const parallax = this.world.state.parallax;

        this.mountains.forEach(m => {
            ctx.save();
            ctx.translate(parallax.x * m.depth * 50, parallax.y * m.depth * 30);
            
            const [r, g, b] = m.baseColor;
            ctx.fillStyle = `rgb(${r * nightFactor}, ${g * nightFactor}, ${b * nightFactor})`;
            
            ctx.fill(m.path);
            ctx.restore();
        });
    }
}
