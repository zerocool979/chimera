/* =====================================================
   GAME STATE
   ===================================================== */
const gameState = {
    // Time & Weather
    isNight: true,
    timeCycle: 0,
    weather: 'clear',

    // Player
    location: 'forest',
    gold: 0,
    xp: 0,
    inventory: ['⚔️', '🛡️', '🔑'],

    // Stats
    meteorCount: 0,
    fireflyCount: 0,
    starCount: 0,

    // NPC Dialog
    npcDialog: {
        forest: "Welcome, adventurer! The forest is full of mysteries. Would you like to embark on a quest?",
        mountain: "The cave holds ancient secrets, but beware of the darkness within."
    }
};

/* =====================================================
   DOM ELEMENT REFERENCES
   ===================================================== */
const dom = {
    gameContainer: document.getElementById('game-container'),
    sceneContainer: document.getElementById('scene-container'),
    forestScene: document.getElementById('night-forest'),
    mountainScene: document.getElementById('mountain'),
    caveScene: document.getElementById('cave'),
    character: document.getElementById('main-character'),
    dialogBox: document.getElementById('dialog-box'),
    dialogText: document.getElementById('dialog-text'),
    dialogOptions: document.getElementById('dialog-options'),
    transition: document.getElementById('scene-transition'),

    // Stats UI
    meteorCount: document.getElementById('meteor-count'),
    fireflyCount: document.getElementById('firefly-count'),
    starCount: document.getElementById('star-count'),
    goldCount: document.getElementById('gold-count'),
    xpCount: document.getElementById('xp-count'),
    timeDisplay: document.getElementById('time-display'),
    weatherDisplay: document.getElementById('weather-display'),
    locationDisplay: document.getElementById('location-display'),

    // Buttons
    dayNightBtn: document.getElementById('day-night-btn'),
    weatherBtn: document.getElementById('weather-btn'),
    sceneBtn: document.getElementById('scene-btn'),
    meteorBtn: document.getElementById('meteor-btn'),
    fireflyBtn: document.getElementById('firefly-btn'),
    questBtn: document.getElementById('quest-btn'),
    fullscreenBtn: document.getElementById('fullscreen-btn')
};

/* =====================================================
   INIT GAME
   ===================================================== */
function initGame() {
    createStars(300, 'forest-stars');
    createPineTrees(20, 'forest-pines');
    createPineTrees(10, 'mountain-pines');

    setupEventListeners();
    startTimeCycle();
    startWeatherSystem();
    animateCharacter();
    animateCampfire();
    startMeteorShower();
    startFireflySystem();

    // Show intro dialog
    setTimeout(() => {
        showDialog(gameState.npcDialog.forest);
    }, 3000);

    updateUI();
}

/* =====================================================
   SCENE MANAGEMENT
   ===================================================== */
function changeScene(newScene) {
    dom.transition.style.display = 'block';

    setTimeout(() => {
        gameState.location = newScene;

        // Reset all scenes off-screen
        dom.forestScene.style.transform = 'translateX(-100%)';
        dom.mountainScene.style.transform = 'translateX(-100%)';
        dom.caveScene.style.transform = 'translateX(-100%)';

        // Show target scene
        if (newScene === 'forest') dom.forestScene.style.transform = 'translateX(0)';
        if (newScene === 'mountain') dom.mountainScene.style.transform = 'translateX(0)';
        if (newScene === 'cave') dom.caveScene.style.transform = 'translateX(0)';

        dom.locationDisplay.textContent = newScene.charAt(0).toUpperCase() + newScene.slice(1);

        setTimeout(() => { dom.transition.style.display = 'none'; }, 1000);
    }, 500);
}

/* =====================================================
   WEATHER SYSTEM
   ===================================================== */
function startWeatherSystem() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            const weatherTypes = ['clear', 'rain', 'snow', 'storm'];
            const newWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
            setWeather(newWeather);
        }
    }, 30000);
}

function setWeather(type) {
    gameState.weather = type;
    dom.weatherDisplay.textContent = type.charAt(0).toUpperCase() + type.slice(1);

    // Clear existing weather
    document.querySelectorAll('.rain-drop, .snow-flake').forEach(el => el.remove());

    const weatherContainer = document.querySelector(`#${gameState.location}-weather`);

    if (type === 'rain') createRain(weatherContainer, 200);
    if (type === 'snow') createSnow(weatherContainer, 150);
    if (type === 'storm') {
        createRain(weatherContainer, 300);
        createLightning(weatherContainer);
    }
}

function createRain(container, count) {
    for (let i = 0; i < count; i++) {
        const drop = document.createElement('div');
        drop.classList.add('rain-drop');
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDelay = `${Math.random() * 5}s`;
        drop.style.animationDuration = `${1 + Math.random() * 2}s`;
        container.appendChild(drop);
    }
}

function createSnow(container, count) {
    for (let i = 0; i < count; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snow-flake');
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.animationDelay = `${Math.random() * 5}s`;
        flake.style.animationDuration = `${5 + Math.random() * 5}s`;
        container.appendChild(flake);
    }
}

function createLightning(container) {
    const lightning = document.createElement('div');
    lightning.classList.add('lightning');
    container.appendChild(lightning);

    const flash = () => {
        lightning.animate([{ opacity: 0 }, { opacity: 0.8 }, { opacity: 0 }], {
            duration: 100,
            iterations: 3
        });
        setTimeout(flash, 3000 + Math.random() * 7000);
    };
    flash();
}

/* =====================================================
   TIME SYSTEM
   ===================================================== */
function startTimeCycle() {
    setInterval(() => {
        gameState.timeCycle = (gameState.timeCycle + 1) % 4;

        switch (gameState.timeCycle) {
            case 0: // Night
                gameState.isNight = true;
                dom.sceneContainer.style.filter = 'brightness(0.7)';
                dom.timeDisplay.textContent = 'Night';
                break;
            case 1: // Dawn
                dom.sceneContainer.style.filter = 'brightness(0.9)';
                dom.timeDisplay.textContent = 'Dawn';
                break;
            case 2: // Day
                gameState.isNight = false;
                dom.sceneContainer.style.filter = 'brightness(1.1)';
                dom.timeDisplay.textContent = 'Day';
                break;
            case 3: // Dusk
                dom.sceneContainer.style.filter = 'brightness(0.8)';
                dom.timeDisplay.textContent = 'Dusk';
                break;
        }
    }, 30000); // 30s cycle
}

/* =====================================================
   DIALOG SYSTEM
   ===================================================== */
function showDialog(text) {
    dom.dialogText.textContent = text;
    dom.dialogBox.style.display = 'block';
}
function hideDialog() {
    dom.dialogBox.style.display = 'none';
}

/* =====================================================
   GAME OBJECT CREATION
   ===================================================== */
function createStars(count, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 60}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.width = star.style.height = `${1 + Math.random() * 3}px`;
        container.appendChild(star);
    }
    gameState.starCount += count;
}

function createPineTrees(count, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const pine = document.createElement('div');
        pine.classList.add('pine');
        pine.style.left = `${Math.random() * 95}%`;
        pine.innerHTML = `
            <div class="pine-trunk"></div>
            <div class="pine-top"></div>
            <div class="pine-mid"></div>
            <div class="pine-base"></div>
        `;
        container.appendChild(pine);
    }
}

function createMeteor() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    meteor.style.position = 'absolute';
    meteor.style.top = `${Math.random() * 30}%`;
    meteor.style.left = `${Math.random() * 100}%`;
    meteor.style.width = meteor.style.height = '4px';
    document.querySelector('.scene:not([style*="translateX(-100%)"])').appendChild(meteor);

    meteor.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], {
        duration: 2000,
        easing: 'linear'
    });

    setTimeout(() => meteor.remove(), 2000);
    gameState.meteorCount++;
}

function createFirefly() {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');
    firefly.style.position = 'absolute';
    firefly.style.top = `${40 + Math.random() * 40}%`;
    firefly.style.left = `${Math.random() * 100}%`;
    firefly.style.width = firefly.style.height = '4px';
    firefly.style.background = '#ff0';
    firefly.style.borderRadius = '50%';
    firefly.style.animation = `fireflyFloat ${3 + Math.random() * 4}s infinite alternate ease-in-out`;

    document.querySelector('.scene:not([style*="translateX(-100%)"])').appendChild(firefly);
    gameState.fireflyCount++;
}

/* =====================================================
   GAME SYSTEMS
   ===================================================== */
function startMeteorShower() {
    setInterval(() => {
        if (gameState.isNight && Math.random() > 0.7) {
            createMeteor();
            updateUI();
        }
    }, 3000);
}

function startFireflySystem() {
    setInterval(() => {
        if (gameState.isNight && gameState.location === 'forest' && gameState.fireflyCount < 30) {
            createFirefly();
            updateUI();
        }
    }, 2000);
}

function animateCharacter() {
    dom.character.style.animation = 'breathe 3s infinite ease-in-out';
}

function animateCampfire() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.animation = 'none';
        void flame.offsetWidth;
        flame.style.animation = `flicker ${0.5 + Math.random() * 0.5}s infinite alternate`;
    });
    setTimeout(animateCampfire, 3000);
}

/* =====================================================
   UI MANAGEMENT
   ===================================================== */
function updateUI() {
    dom.meteorCount.textContent = gameState.meteorCount;
    dom.fireflyCount.textContent = gameState.fireflyCount;
    dom.starCount.textContent = gameState.starCount;
    dom.goldCount.textContent = gameState.gold;
    dom.xpCount.textContent = gameState.xp;
}

/* =====================================================
   EVENT HANDLERS
   ===================================================== */
function setupEventListeners() {
    // Toggle Day/Night
    dom.dayNightBtn.addEventListener('click', () => {
        gameState.isNight = !gameState.isNight;
        dom.timeDisplay.textContent = gameState.isNight ? 'Night' : 'Day';
    });

    // Weather
    dom.weatherBtn.addEventListener('click', () => {
        const weatherTypes = ['clear', 'rain', 'snow', 'storm'];
        const currentIndex = weatherTypes.indexOf(gameState.weather);
        setWeather(weatherTypes[(currentIndex + 1) % weatherTypes.length]);
    });

    // Scene
    dom.sceneBtn.addEventListener('click', () => {
        const scenes = ['forest', 'mountain', 'cave'];
        const nextScene = scenes[(scenes.indexOf(gameState.location) + 1) % scenes.length];
        changeScene(nextScene);
    });

    // Meteors
    dom.meteorBtn.addEventListener('click', () => {
        for (let i = 0; i < 5; i++) setTimeout(createMeteor, i * 300);
        updateUI();
    });

    // Fireflies
    dom.fireflyBtn.addEventListener('click', () => {
        for (let i = 0; i < 10; i++) setTimeout(createFirefly, i * 200);
        updateUI();
    });

    // Toggle Quest Panel
    dom.questBtn.addEventListener('click', () => {
        const questPanel = document.getElementById('quest-panel');
        questPanel.style.display = questPanel.style.display === 'none' ? 'block' : 'none';
    });

    // Fullscreen
    dom.fullscreenBtn.addEventListener('click', toggleFullScreen);

    // NPC Interaction
    document.getElementById('forest-npc').addEventListener('click', () => {
        showDialog(gameState.npcDialog.forest);
    });

    // Cave Entrance
    document.getElementById('cave-entrance').addEventListener('click', () => {
        changeScene('cave');
    });

    // Treasure Chest
    document.getElementById('treasure-chest').addEventListener('click', () => {
        gameState.gold += 100;
        gameState.xp += 50;
        updateUI();
        showDialog("You found a treasure chest! +100 Gold, +50 XP");
    });

    // Dialog options
    dom.dialogOptions.addEventListener('click', (e) => {
        if (e.target.classList.contains('pixel-btn')) hideDialog();
    });

    // Character Movement
    document.addEventListener('keydown', (e) => {
        const speed = 10;
        const currentLeft = parseInt(dom.character.style.left) || 350;
        const minLeft = 50, maxLeft = 1050;

        if (e.key === 'ArrowRight' || e.key === 'd') {
            dom.character.style.left = `${Math.min(maxLeft, currentLeft + speed)}px`;
        } else if (e.key === 'ArrowLeft' || e.key === 'a') {
            dom.character.style.left = `${Math.max(minLeft, currentLeft - speed)}px`;
        }
    });
}

/* =====================================================
   FULLSCREEN HANDLER
   ===================================================== */
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        dom.gameContainer.requestFullscreen?.();
        dom.fullscreenBtn.textContent = 'X';
    } else {
        document.exitFullscreen?.();
        dom.fullscreenBtn.textContent = '[ ]';
    }
}

/* =====================================================
   START GAME
   ===================================================== */
window.addEventListener('load', initGame);
