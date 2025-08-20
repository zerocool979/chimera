// Game State
const gameState = {
    isNight: true,
    meteorCount: 0,
    fireflyCount: 0,
    starCount: 0,
    isMoving: false,
    campfireActive: true,
    firefliesActive: false
};

// DOM Elements
const scene = document.getElementById('scene');
const gameContainer = document.getElementById('game-container');
const starsContainer = document.getElementById('stars-container');
const pinesContainer = document.getElementById('pines-container');
const character = document.getElementById('character');
const campfire = document.getElementById('campfire');
const dayNightBtn = document.getElementById('day-night-btn');
const meteorBtn = document.getElementById('meteor-btn');
const fireflyBtn = document.getElementById('firefly-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const meteorCountEl = document.getElementById('meteor-count');
const fireflyCountEl = document.getElementById('firefly-count');
const starCountEl = document.getElementById('star-count');
const timeDisplay = document.getElementById('time-display');

// Initialize Game
function initGame() {
    createStars(200);
    createPineTrees(15);
    setupEventListeners();
    animateCharacter();
    animateCampfire();
    startMeteorShower();
    startDayNightCycle();
    updateUI();
}

// Create Stars
function createStars(count) {
    starsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const top = Math.random() * 60;
        const left = Math.random() * 100;
        const size = 1 + Math.random() * 3;
        const opacity = 0.3 + Math.random() * 0.7;
        const duration = 2 + Math.random() * 4;
        const delay = Math.random() * 5;
        
        star.style.cssText = `
            top: ${top}%;
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            opacity: ${opacity};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        starsContainer.appendChild(star);
    }
    gameState.starCount = count;
}

// Create Pine Trees
function createPineTrees(count) {
    pinesContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const pine = document.createElement('div');
        pine.classList.add('pine');
        
        const left = Math.random() * 90;
        const height = 120 + Math.random() * 80;
        const delay = Math.random() * 2;
        
        pine.style.cssText = `
            left: ${left}%;
            height: ${height}px;
            animation-delay: ${delay}s;
        `;
        
        pine.innerHTML = `
            <div class="pine-trunk"></div>
            <div class="pine-top"></div>
            <div class="pine-mid"></div>
            <div class="pine-base"></div>
        `;
        
        pinesContainer.appendChild(pine);
    }
}

// Create Meteor
function createMeteor() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    
    const startTop = Math.random() * 30;
    const startLeft = Math.random() * 100 + 10;
    const endTop = startTop + 30 + Math.random() * 30;
    const endLeft = startLeft - 40 - Math.random() * 40;
    const size = 3 + Math.random() * 4;
    const duration = 1 + Math.random() * 2;
    
    meteor.style.cssText = `
        top: ${startTop}%;
        left: ${startLeft}%;
        width: ${size}px;
        height: ${size}px;
    `;
    
    scene.appendChild(meteor);
    
    // Animate meteor
    meteor.animate([
        { transform: 'translate(0, 0)', opacity: 0 },
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${endLeft - startLeft}vw, ${endTop - startTop}vh)`, opacity: 0 }
    ], {
        duration: duration * 1000,
        easing: 'linear'
    });
    
    // Create trail
    createMeteorTrail(meteor, duration);
    
    // Remove meteor after animation
    setTimeout(() => {
        meteor.remove();
    }, duration * 1000);
    
    gameState.meteorCount++;
}

// Create meteor trail
function createMeteorTrail(meteor, duration) {
    const trailInterval = setInterval(() => {
        if (!meteor.isConnected) {
            clearInterval(trailInterval);
            return;
        }
        
        const rect = meteor.getBoundingClientRect();
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.cssText = `
            top: ${rect.top}px;
            left: ${rect.left}px;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
        `;
        
        scene.appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(0)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
        
    }, 50);
    
    setTimeout(() => {
        clearInterval(trailInterval);
    }, duration * 1000);
}

// Create Firefly
function createFirefly() {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');
    
    const startTop = 40 + Math.random() * 40;
    const startLeft = Math.random() * 100;
    const endTop = startTop + (Math.random() * 20 - 10);
    const endLeft = startLeft + (Math.random() * 20 - 10);
    const size = 2 + Math.random() * 2;
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 5;
    
    firefly.style.cssText = `
        top: ${startTop}%;
        left: ${startLeft}%;
        width: ${size}px;
        height: ${size}px;
        animation: fireflyFloat ${duration}s infinite alternate ease-in-out;
        animation-delay: ${delay}s;
    `;
    
    // Add keyframes for movement
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fireflyFloat {
            0% { transform: translate(0, 0); }
            100% { transform: translate(${endLeft - startLeft}%, ${endTop - startTop}%); }
        }
    `;
    document.head.appendChild(style);
    
    scene.appendChild(firefly);
    gameState.fireflyCount++;
    
    // Remove style after animation completes
    setTimeout(() => {
        document.head.removeChild(style);
    }, duration * 1000);
    
    // Create glow effect
    setInterval(() => {
        firefly.animate([
            { opacity: 0.3, boxShadow: '0 0 5px 1px yellow' },
            { opacity: 0.9, boxShadow: '0 0 15px 5px yellow' },
            { opacity: 0.3, boxShadow: '0 0 5px 1px yellow' }
        ], {
            duration: 1000 + Math.random() * 2000,
            easing: 'ease-in-out'
        });
    }, 3000 + Math.random() * 5000);
}

// Start meteor shower
function startMeteorShower() {
    setInterval(() => {
        if (gameState.isNight && Math.random() > 0.7) {
            createMeteor();
            updateUI();
        }
    }, 3000);
}

// Start day/night cycle
function startDayNightCycle() {
    setInterval(() => {
        gameState.isNight = !gameState.isNight;
        toggleDayNightMode();
    }, 60000); // 1 minute cycle
}

// Toggle day/night mode
function toggleDayNightMode() {
    gameState.isNight = !gameState.isNight;
    
    if (gameState.isNight) {
        scene.classList.remove('day-mode');
        dayNightBtn.textContent = 'Day Mode';
        timeDisplay.textContent = 'Night Time';
    } else {
        scene.classList.add('day-mode');
        dayNightBtn.textContent = 'Night Mode';
        timeDisplay.textContent = 'Day Time';
    }
    
    updateUI();
}

// Animate character
function animateCharacter() {
    character.style.animation = 'breathe 3s infinite ease-in-out';
}

// Animate campfire
function animateCampfire() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        // Reset animation
        flame.style.animation = 'none';
        
        // Trigger reflow
        void flame.offsetWidth;
        
        // Start new animation with random duration
        const duration = 0.5 + Math.random() * 0.5;
        flame.style.animation = `flicker ${duration}s infinite alternate`;
    });
    
    // Periodically refresh
    setTimeout(animateCampfire, 3000);
}

// Toggle campfire
function toggleCampfire() {
    gameState.campfireActive = !gameState.campfireActive;
    const flames = document.querySelector('.flames');
    const glow = document.querySelector('.fire-glow');
    
    if (gameState.campfireActive) {
        flames.style.display = 'block';
        glow.style.opacity = '0.5';
        animateCampfire();
    } else {
        flames.style.display = 'none';
        glow.style.opacity = '0';
    }
}

// Toggle fireflies
function toggleFireflies() {
    gameState.firefliesActive = !gameState.firefliesActive;
    
    if (gameState.firefliesActive) {
        // Create initial fireflies
        for (let i = 0; i < 15; i++) {
            createFirefly();
        }
        
        // Keep adding fireflies periodically
        fireflyInterval = setInterval(() => {
            if (gameState.firefliesActive && gameState.fireflyCount < 50) {
                createFirefly();
                updateUI();
            }
        }, 3000);
    } else {
        // Remove all fireflies
        document.querySelectorAll('.firefly').forEach(fly => fly.remove());
        gameState.fireflyCount = 0;
        clearInterval(fireflyInterval);
    }
    
    updateUI();
}

// Setup event listeners
function setupEventListeners() {
    // Day/Night toggle
    dayNightBtn.addEventListener('click', toggleDayNightMode);
    
    // Meteor button
    meteorBtn.addEventListener('click', () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(createMeteor, i * 300);
        }
        updateUI();
    });
    
    // Firefly button
    fireflyBtn.addEventListener('click', toggleFireflies);
    
    // Fullscreen button
    fullscreenBtn.addEventListener('click', toggleFullScreen);
    
    // Campfire interaction
    campfire.addEventListener('click', toggleCampfire);
    
    // Character movement
    document.addEventListener('keydown', (e) => {
        if (gameState.isMoving) return;
        
        const speed = 10;
        const currentLeft = parseInt(character.style.left) || 350;
        const minLeft = 50;
        const maxLeft = 850;
        
        if (e.key === 'ArrowRight' || e.key === 'd') {
            character.style.left = `${Math.min(maxLeft, currentLeft + speed)}px`;
            moveCharacter();
        } else if (e.key === 'ArrowLeft' || e.key === 'a') {
            character.style.left = `${Math.max(minLeft, currentLeft - speed)}px`;
            moveCharacter();
        }
    });
    
    // Parallax effect
    scene.addEventListener('mousemove', (e) => {
        const rect = scene.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const moveX = (x - 0.5) * 30;
        const moveY = (y - 0.5) * 30;
        
        document.querySelector('.moon').style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
        document.querySelector('.sun').style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
        document.querySelectorAll('.hill').forEach((hill, i) => {
            const depth = 0.1 * (3 - i);
            hill.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
        });
        document.querySelectorAll('.pine').forEach(pine => {
            pine.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
        });
    });
    
    // Click to create particles
    scene.addEventListener('click', (e) => {
        if (e.target === campfire) return;
        
        for (let i = 0; i < 10; i++) {
            createClickParticle(e.clientX, e.clientY);
        }
    });
}

// Create particle on click
function createClickParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 8 + 2;
    const color = gameState.isNight ? 
        `hsl(${Math.random() * 60 + 200}, 80%, 60%)` : 
        `hsl(${Math.random() * 60 + 30}, 80%, 60%)`;
    
    particle.style.cssText = `
        top: ${y}px;
        left: ${x}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
    `;
    
    scene.appendChild(particle);
    
    // Animate particle
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    
    particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
    ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'ease-out'
    });
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Move character with animation
function moveCharacter() {
    if (gameState.isMoving) return;
    
    gameState.isMoving = true;
    const leftArm = document.querySelector('.char-arm-left');
    const rightArm = document.querySelector('.char-arm-right');
    const leftLeg = document.querySelector('.char-leg-left');
    const rightLeg = document.querySelector('.char-leg-right');
    
    // Reset animations
    leftArm.style.animation = 'none';
    rightArm.style.animation = 'none';
    leftLeg.style.animation = 'none';
    rightLeg.style.animation = 'none';
    
    void leftArm.offsetWidth;
    void rightArm.offsetWidth;
    void leftLeg.offsetWidth;
    void rightLeg.offsetWidth;
    
    // Start animations
    leftArm.style.animation = 'armSwing 0.5s infinite alternate ease-in-out';
    rightArm.style.animation = 'armSwing 0.5s infinite alternate-reverse ease-in-out';
    leftLeg.style.animation = 'legWalk 0.5s infinite alternate ease-in-out';
    rightLeg.style.animation = 'legWalk 0.5s infinite alternate-reverse ease-in-out';
    
    // Stop animations after a while
    setTimeout(() => {
        leftArm.style.animation = '';
        rightArm.style.animation = '';
        leftLeg.style.animation = '';
        rightLeg.style.animation = '';
        gameState.isMoving = false;
    }, 500);
}

// Toggle fullscreen
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        if (gameContainer.requestFullscreen) {
            gameContainer.requestFullscreen();
        } else if (gameContainer.mozRequestFullScreen) {
            gameContainer.mozRequestFullScreen();
        } else if (gameContainer.webkitRequestFullscreen) {
            gameContainer.webkitRequestFullscreen();
        } else if (gameContainer.msRequestFullscreen) {
            gameContainer.msRequestFullscreen();
        }
        fullscreenBtn.textContent = 'X';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        fullscreenBtn.textContent = '[ ]';
    }
}

// Update UI
function updateUI() {
    meteorCountEl.textContent = gameState.meteorCount;
    fireflyCountEl.textContent = gameState.fireflyCount;
    starCountEl.textContent = gameState.starCount;
}

// Initialize game when loaded
window.addEventListener('load', initGame);
