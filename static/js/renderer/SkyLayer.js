// --- FILE: js/renderer/SkyLayer.js ---
export class SkyLayer {
    constructor(world) { this.world = world; }
    draw(ctx) {
        const time = this.world.state.timeOfDay;
        const grad = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
        // ... (complex color interpolation logic from previous version) ...
        grad.addColorStop(0, '#0c0d21'); // Simplified for brevity
        grad.addColorStop(1, '#1a1a3d');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        // ... (sun and moon drawing logic) ...
    }
}
