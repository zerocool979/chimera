/**
 * Project Chimera - Main Entry Point
 * * This file imports the core Engine and initializes the entire application.
 * The browser's module system will handle loading all dependencies from here.
 */
import { Engine } from './core/Engine.js';
import { $ } from './utils/helpers.js';

// Initialize the application once the DOM is ready.
window.addEventListener('DOMContentLoaded', () => {
    const loader = $('#loader');
    try {
        // Create a new instance of the Engine, which starts the simulation.
        new Engine();
    } catch (error) {
        console.error("Failed to initialize the Chimera Engine:", error);
        if (loader) {
            loader.innerHTML = '<p style="color: #ff6b6b;">A critical error occurred while weaving reality. Please refresh.</p>';
        }
    }
});
