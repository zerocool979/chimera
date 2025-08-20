/**
 * Project Chimera - Constants & Configuration
 * File ini berisi semua nilai inti yang menggerakkan simulasi.
 * Mengubah nilai di sini akan memengaruhi perilaku dunia secara global.
 */

// Skala waktu simulasi. 10 berarti 1 hari di dunia nyata = 10 hari di simulasi.
export const TIME_SCALE = 10;

// Nama-nama musim dalam urutan siklusnya.
export const SEASONS = ['spring', 'summer', 'autumn', 'winter'];

// Pola cuaca yang mungkin terjadi di setiap musim.
export const WEATHER_PATTERNS = {
    spring: ['clear', 'rain', 'windy'],
    summer: ['clear', 'storm'],
    autumn: ['clear', 'rain', 'windy'],
    winter: ['clear', 'snow', 'windy'],
};

// Batas maksimum partikel yang diizinkan untuk menjaga performa.
export const MAX_PARTICLES = 2000;

// Konfigurasi warna dasar untuk setiap musim.
// Ini adalah nilai RGB dasar yang akan dimodifikasi oleh siklus siang/malam.
export const SEASONAL_COLORS = {
    spring: {
        mountains: [[107, 138, 122], [139, 168, 145], [163, 196, 162]],
        flora: '#4ade80',
    },
    summer: {
        mountains: [[26, 36, 51], [35, 49, 69], [45, 62, 88]],
        flora: '#22c55e',
    },
    autumn: {
        mountains: [[88, 55, 42], [139, 78, 58], [188, 114, 85]],
        flora: '#f97316',
    },
    winter: {
        mountains: [[74, 85, 104], [100, 116, 139], [159, 182, 205]],
        flora: '#ffffff',
    },
};

// Konfigurasi warna untuk siklus langit.
export const SKY_COLORS = {
    night: { top: '#0c0d21', bottom: '#1a1a3d' },
    dusk: { top: '#2c214d', bottom: '#ff7e5f' },
    day: { top: '#87ceeb', bottom: '#d7f1fa' },
    dawn: { top: '#ff9a8b', bottom: '#ff6a88' },
};
