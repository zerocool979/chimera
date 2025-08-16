/**
 * Project Chimera - Entity Layer Renderer
 * Bertanggung jawab untuk merender semua entitas dinamis (partikel).
 */
export class EntityLayer {
    constructor(world) {
        this.world = world;
    }

    draw(ctx, entities) {
        const state = this.world.state;
        entities.forEach(entity => {
            entity.draw(ctx, state);
        });
    }
}
