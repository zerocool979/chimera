// NOTE: The following classes would be in their respective files as per the project structure.
// For this demonstration, they are included here to be self-contained.

// --- FILE: js/utils/helpers.js ---
export const $ = (sel, root = document) => root.querySelector(sel);
export const store = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } },
    set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};
export const lerp = (a, b, t) => a + (b - a) * t;
export const random = (min, max) => Math.random() * (max - min) + min;
export const lerpColor = (a, b, amount) => {
    const ah = +a.replace('#', '0x'), bh = +b.replace('#', '0x'),
          ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
          br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
          rr = ar + amount * (br - ar),
          rg = ag + amount * (bg - ag),
          rb = ab + amount * (bb - ab);
    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
};
