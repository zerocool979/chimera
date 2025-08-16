// --- FILE: js/core/Ticker.js ---
export class Ticker {
    constructor() {
        this.callbacks = new Set();
        this.lastTime = 0;
        this.isRunning = false;
    }
    on(event, callback) { if (event === 'tick') this.callbacks.add(callback); }
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.tick.bind(this));
    }
    tick(currentTime) {
        if (!this.isRunning) return;
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        for (const callback of this.callbacks) {
            callback(deltaTime);
        }
        requestAnimationFrame(this.tick.bind(this));
    }
}
