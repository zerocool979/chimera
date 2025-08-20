// --- FILE: js/core/Engine.js ---
import { Ticker } from './Ticker.js';
import { World } from '../world/World.js';
import { Renderer } from '../renderer/Renderer.js';
import { EntityManager } from '../managers/EntityManager.js';
import { AudioManager } from '../managers/AudioManager.js';
import { InputManager } from '../managers/InputManager.js';
import { UIManager } from '../managers/UIManager.js';

export class Engine {
    constructor() {
        this.canvas = $('#scene-canvas');
        if (!this.canvas) throw new Error('Scene canvas not found!');
        
        this.ctx = this.canvas.getContext('2d');
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);

        this.ticker = new Ticker();
        this.world = new World();
        this.renderer = new Renderer(this.ctx, this.world);
        this.entityManager = new EntityManager(this.world);
        this.audioManager = new AudioManager();
        this.uiManager = new UIManager(this.world, this.audioManager);
        this.inputManager = new InputManager(this.world, this.uiManager);

        this.init();
    }

    init() {
        window.addEventListener('resize', this.resize.bind(this), { passive: true });
        this.resize();
        
        this.ticker.on('tick', this.update.bind(this));
        this.ticker.start();
        
        setTimeout(() => { $('#loader').classList.add('hidden'); }, 500);
    }

    resize() {
        const { innerWidth: w, innerHeight: h } = window;
        this.canvas.width = w * this.dpr;
        this.canvas.height = h * this.dpr;
        this.canvas.style.width = `${w}px`;
        this.canvas.style.height = `${h}px`;
        this.ctx.scale(this.dpr, this.dpr);
        this.renderer.onResize();
    }

    update(deltaTime) {
        this.world.update(deltaTime);
        this.entityManager.update(deltaTime);
        this.renderer.draw(this.entityManager.entities);
        this.uiManager.update();
        this.audioManager.update(this.world.state);
    }
}
