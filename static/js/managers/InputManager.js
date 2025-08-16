/**
 * Project Chimera - Input Manager
 * Menangani semua input pengguna (mouse, keyboard, sentuhan)
 * dan menerjemahkannya menjadi aksi di dalam dunia.
 */
export class InputManager {
    constructor(world, uiManager) {
        this.world = world;
        this.uiManager = uiManager;
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.bindEvents();
    }

    bindEvents() {
        // Parallax effect
        if (!this.isReducedMotion) {
            window.addEventListener('pointermove', e => {
                this.world.state.parallax.x = (e.clientX / window.innerWidth - 0.5) * 2;
                this.world.state.parallax.y = (e.clientY / window.innerHeight - 0.5) * 2;
            }, { passive: true });
        }

        // Keyboard shortcuts
        window.addEventListener('keydown', e => {
            const keyMap = {
                d: () => this.uiManager.elements.buttons.time.click(),
                s: () => this.uiManager.elements.buttons.season.click(),
                m: () => this.uiManager.elements.buttons.audio.click(),
            };
            const action = keyMap[e.key.toLowerCase()];
            if (action) action();
        });
    }
}
