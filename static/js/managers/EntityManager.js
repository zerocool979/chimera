// --- FILE: js/managers/EntityManager.js ---
import { Star, Raindrop, Snowflake, FallingLeaf } from '../entities/Particle.js';
export class EntityManager {
    constructor(world) { this.world = world; this.entities = []; }
    update(deltaTime) {
        // ... (Spawning logic based on world state) ...
        if (!this.isDay && Math.random() > 0.7) this.add(Star);
        this.entities.forEach((e, i) => {
            e.update(deltaTime);
            if (e.isDead) this.entities.splice(i, 1);
        });
    }
    add(Type, ...args) { if (this.entities.length < 2000) this.entities.push(new Type(...args)); }
}
