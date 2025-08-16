// --- FILE: js/renderer/Renderer.js ---
import { SkyLayer } from './SkyLayer.js';
import { MountainLayer } from './MountainLayer.js';
import { FloraLayer } from './FloraLayer.js';
import { EntityLayer } from './EntityLayer.js';

export class Renderer {
    constructor(ctx, world) {
        this.ctx = ctx;
        this.world = world;
        this.layers = [
            new SkyLayer(world),
            new MountainLayer(world),
            new FloraLayer(world),
            new EntityLayer(world),
        ];
    }
    onResize() { this.layers.forEach(l => l.onResize?.()); }
    draw(entities) {
        this.layers.forEach(l => l.draw(this.ctx, entities));
    }
}
