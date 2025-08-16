/**
 * Project Chimera - Audio Manager
 * Mengelola semua elemen audio, crossfade, dan sinkronisasi dengan dunia.
 */
import { $ } from '../utils/helpers.js';
import { store } from '../utils/helpers.js';
import { lerp } from '../utils/helpers.js';

export class AudioManager {
    constructor() {
        this.sounds = {
            day: $('#day-sound'), night: $('#night-sound'),
            rain: $('#rain-sound'), thunder: $('#thunder-sound'),
            wind: $('#wind-sound'),
        };
        this.isMuted = store.get('isMuted', true);
        this.isArmed = false; // Mencegah autoplay sebelum interaksi pengguna
        
        window.addEventListener('pointerdown', () => this.arm(), { once: true });
    }
    
    arm() {
        if (this.isArmed) return;
        this.isArmed = true;
        Object.values(this.sounds).forEach(s => {
            if (s) {
                s.volume = 0;
                s.play().catch(() => {});
            }
        });
    }

    fade(sound, targetVolume, duration = 1000) {
        if (!sound) return;
        const startVolume = sound.volume;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            sound.volume = lerp(startVolume, targetVolume, progress);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        store.set('isMuted', this.isMuted);
    }
    
    playSound(soundKey) {
        const sound = this.sounds[soundKey];
        if (!this.isMuted && this.isArmed && sound) {
            sound.currentTime = 0;
            sound.volume = 0.6;
        }
    }

    update(state) {
        if (!this.isArmed) return;
        
        const targetMasterVolume = this.isMuted ? 0 : 0.5;
        const isDay = state.timeOfDay > 0.25 && state.timeOfDay < 0.75;

        this.fade(isDay ? this.sounds.day : this.sounds.night, targetMasterVolume);
        this.fade(isDay ? this.sounds.night : this.sounds.day, 0);
        
        const rainVol = (state.weather === 'rain' || state.weather === 'storm') ? 0.7 : 0;
        const windVol = (state.weather === 'windy' || state.weather === 'storm') ? 0.6 : 0;
        
        this.fade(this.sounds.rain, this.isMuted ? 0 : rainVol);
        this.fade(this.sounds.wind, this.isMuted ? 0 : windVol);
    }
}
