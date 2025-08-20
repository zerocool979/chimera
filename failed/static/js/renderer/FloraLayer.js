/**
 * Project Chimera - Flora Layer Renderer
 * Bertanggung jawab untuk merender elemen vegetasi seperti pohon.
 */
import { SEASONAL_COLORS } from '../utils/constants.js';

export class FloraLayer {
    constructor(world) {
        this.world = world;
        this.trees = [
            { x: 0.15, scale: 1, swayOffset: 0 },
            { x: 0.85, scale: 0.8, swayOffset: 2 },
        ];
    }

    draw(ctx) {
        const season = this.world.state.season;
        const leafColor = SEASONAL_COLORS[season].flora;
        const parallax = this.world.state.parallax;
        const time = performance.now() / 1000;

        this.trees.forEach(tree => {
            ctx.save();
            
            const depth = 1.2;
            ctx.translate(
                parallax.x * depth * 50,
                parallax.y * depth * 30
            );

            const h = window.innerHeight;
            const w = window.innerWidth;
            const baseX = w * tree.x;
            const baseY = h * 0.75;
            const trunkHeight = 60 * tree.scale;
            const trunkWidth = 10 * tree.scale;
            const canopyHeight = 70 * tree.scale;
            const canopyWidth = 50 * tree.scale;

            // Swaying animation
            const sway = Math.sin(time * 0.2 + tree.swayOffset) * 2;
            ctx.translate(baseX, baseY);
            ctx.rotate(sway * Math.PI / 180);
            ctx.translate(-baseX, -baseY);

            // Draw Trunk
            ctx.fillStyle = '#4a2e1d';
            ctx.fillRect(baseX - trunkWidth / 2, baseY - trunkHeight, trunkWidth, trunkHeight);

            // Draw Canopy
            ctx.fillStyle = leafColor;
            ctx.beginPath();
            ctx.moveTo(baseX, baseY - trunkHeight - canopyHeight);
            ctx.lineTo(baseX + canopyWidth / 2, baseY - trunkHeight);
            ctx.lineTo(baseX - canopyWidth / 2, baseY - trunkHeight);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        });
    }
}
