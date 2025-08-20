// --- FILE: js/world/World.js ---
export class World {
    constructor() {
        this.TIME_SCALE = 10;
        this.SEASONS = ['spring', 'summer', 'autumn', 'winter'];
        this.WEATHER_PATTERNS = {
            spring: ['clear', 'rain'], summer: ['clear', 'storm'],
            autumn: ['clear', 'rain', 'windy'], winter: ['clear', 'snow', 'windy'],
        };

        this.state = {
            day: store.get('day', 1),
            timeOfDay: store.get('timeOfDay', 0.75),
            season: 'summer', weather: 'clear',
            parallax: { x: 0, y: 0 }
        };
        this.updateSeason();
    }
    update(deltaTime) {
        this.state.timeOfDay = (this.state.timeOfDay + (deltaTime / 2400) * this.TIME_SCALE) % 1;
        if (Math.floor(this.state.timeOfDay * 1000) === 0) {
            this.state.day++;
            this.updateSeason();
            this.changeWeather();
        }
        store.set('day', this.state.day);
        store.set('timeOfDay', this.state.timeOfDay);
    }
    updateSeason() { /* ... (logic from previous version) ... */ }
    changeWeather() { /* ... (logic from previous version) ... */ }
    forceNextSeason() { /* ... (logic from previous version) ... */ }
}
