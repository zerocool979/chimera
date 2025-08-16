/**
 * Project Chimera - UI Manager
 * Mengelola semua elemen DOM, pembaruan info, dan interaksi UI.
 */
import { $ } from '../utils/helpers.js';

export class UIManager {
    constructor(world, audioManager) {
        this.world = world;
        this.audioManager = audioManager;
        
        this.elements = {
            info: {
                time: $('#info-time'),
                season: $('#info-season'),
                weather: $('#info-weather'),
            },
            buttons: {
                time: $('#control-time'),
                season: $('#control-season'),
                audio: $('#control-audio'),
            },
            character: $('#character'),
        };

        this.bindEvents();
    }

    bindEvents() {
        this.elements.buttons.time.addEventListener('click', () => {
            this.world.state.timeOfDay = (this.world.state.timeOfDay + 0.1) % 1;
        });
        this.elements.buttons.season.addEventListener('click', () => {
            this.world.forceNextSeason();
        });
        this.elements.buttons.audio.addEventListener('click', () => {
            this.audioManager.toggleMute();
        });
    }

    update() {
        const { timeOfDay, season, weather } = this.world.state;
        
        // Update Info Display
        const hours = Math.floor(timeOfDay * 24);
        const minutes = Math.floor(((timeOfDay * 24) % 1) * 60);
        this.elements.info.time.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        this.elements.info.season.textContent = season.charAt(0).toUpperCase() + season.slice(1);
        this.elements.info.weather.textContent = weather.charAt(0).toUpperCase() + weather.slice(1);
        
        // Update Body Attributes for CSS theming
        document.body.dataset.season = season;
        document.body.dataset.timeOfDay = (timeOfDay > 0.25 && timeOfDay < 0.75) ? 'day' : 'night';
        
        // Update Audio Button State
        this.elements.buttons.audio.textContent = this.audioManager.isMuted ? '🔇' : '🔊';
        this.elements.buttons.audio.setAttribute('aria-pressed', !this.audioManager.isMuted);
    }
}
