/**
 * Project Chimera - Particle System
 * Kelas dasar dan implementasi untuk semua partikel dinamis.
 */
import { random } from '../utils/helpers.js';

// --- FILE: js/entities/Particle.js ---
export class Particle {
    constructor() {
        this.isDead = false;
    }
    update(deltaTime) {}
    draw(ctx, state) {}
}
