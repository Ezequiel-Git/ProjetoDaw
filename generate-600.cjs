const fs = require('fs');

const instruments = [];

const categories = [
    {
        name: 'Bateria Acustica',
        types: [
            { name: 'Kick', type: 'kick', attack: 0.0, decay: 0.15, sustain: 0.0, release: 0.1, cutoff: 120, resonance: 1.0 },
            { name: 'Kick Deep (808)', type: 'kick_deep', attack: 0.02, decay: 0.5, sustain: 0.1, release: 0.3, cutoff: 80, resonance: 1.0 },
            { name: 'Kick Heavy', type: 'kick_heavy', attack: 0.0, decay: 0.2, sustain: 0.0, release: 0.1, cutoff: 150, resonance: 1.0 },
            { name: 'Kick Soft', type: 'kick_soft', attack: 0.01, decay: 0.15, sustain: 0.0, release: 0.1, cutoff: 100, resonance: 1.0 },
            { name: 'Kick Lofi', type: 'kick_lofi', attack: 0.02, decay: 0.12, sustain: 0.0, release: 0.08, cutoff: 180, resonance: 0.8 },
            { name: 'Snare', type: 'snare', attack: 0.0, decay: 0.18, sustain: 0.0, release: 0.1, cutoff: 1000, resonance: 1.0 },
            { name: 'Snare Soft', type: 'snare_soft', attack: 0.01, decay: 0.15, sustain: 0.0, release: 0.1, cutoff: 1200, resonance: 1.0 },
            { name: 'Snare Electro', type: 'snare_electro', attack: 0.0, decay: 0.22, sustain: 0.0, release: 0.1, cutoff: 1500, resonance: 1.0 },
            { name: 'Snare Lofi', type: 'snare_lofi', attack: 0.01, decay: 0.15, sustain: 0.0, release: 0.1, cutoff: 900, resonance: 0.8 },
            { name: 'Rimshot', type: 'rimshot', attack: 0.0, decay: 0.08, sustain: 0.0, release: 0.05, cutoff: 1800, resonance: 2.0 },
            { name: 'Clap', type: 'clap', attack: 0.01, decay: 0.25, sustain: 0.0, release: 0.2, cutoff: 1200, resonance: 1.0 },
            { name: 'Clap Acoustic', type: 'clap_acoustic', attack: 0.01, decay: 0.22, sustain: 0.0, release: 0.15, cutoff: 1000, resonance: 1.0 },
            { name: 'Hi-Hat Closed', type: 'hihat', attack: 0.0, decay: 0.05, sustain: 0.0, release: 0.05, cutoff: 7500, resonance: 1.0 },
            { name: 'Hi-Hat Open', type: 'hihat_open', attack: 0.01, decay: 0.35, sustain: 0.0, release: 0.2, cutoff: 6500, resonance: 1.0 },
            { name: 'Crash Cymbal', type: 'crash', attack: 0.01, decay: 0.8, sustain: 0.2, release: 1.2, cutoff: 8000, resonance: 1.0, reverb: 0.3 },
            { name: 'Ride Cymbal', type: 'ride', attack: 0.01, decay: 0.6, sustain: 0.1, release: 0.8, cutoff: 7000, resonance: 1.2 },
            { name: 'Tom High', type: 'tom', attack: 0.01, decay: 0.2, sustain: 0.0, release: 0.15, cutoff: 350, resonance: 1.5 },
            { name: 'Tom Mid', type: 'tom', attack: 0.01, decay: 0.25, sustain: 0.0, release: 0.2, cutoff: 250, resonance: 1.5 },
            { name: 'Tom Low', type: 'tom', attack: 0.01, decay: 0.3, sustain: 0.0, release: 0.25, cutoff: 150, resonance: 1.5 },
            { name: 'Tambourine', type: 'tambourine', attack: 0.0, decay: 0.12, sustain: 0.0, release: 0.1, cutoff: 7000, resonance: 1.5 },
            { name: 'Cowbell', type: 'cowbell', attack: 0.0, decay: 0.15, sustain: 0.0, release: 0.15, cutoff: 2200, resonance: 3.0 },
            { name: 'Shaker', type: 'shaker', attack: 0.02, decay: 0.08, sustain: 0.0, release: 0.08, cutoff: 8000, resonance: 1.0 },
            { name: 'Conga', type: 'conga', attack: 0.01, decay: 0.18, sustain: 0.0, release: 0.15, cutoff: 280, resonance: 1.8 },
            { name: 'Bongo', type: 'bongo', attack: 0.01, decay: 0.12, sustain: 0.0, release: 0.1, cutoff: 400, resonance: 2.0 },
            { name: 'Timpani', type: 'sine', attack: 0.02, decay: 0.8, sustain: 0.0, release: 0.8, cutoff: 200, resonance: 1.2 },
            { name: 'War Drum', type: 'kick_deep', attack: 0.01, decay: 0.6, sustain: 0.1, release: 0.5, cutoff: 120, resonance: 1.0, distortion: 0.1 },
            { name: 'Taiko Drum', type: 'kick_deep', attack: 0.01, decay: 0.4, sustain: 0.0, release: 0.4, cutoff: 180, resonance: 1.5, distortion: 0.15 }
        ]
    },
    {
        name: 'Teclados e Pianos',
        types: [
            { name: 'Grand Piano', type: 'triangle', attack: 0.01, decay: 0.3, sustain: 0.25, release: 0.4, cutoff: 3500, resonance: 1.5 },
            { name: 'Bright Piano', type: 'triangle', attack: 0.01, decay: 0.25, sustain: 0.2, release: 0.3, cutoff: 5000, resonance: 2.0 },
            { name: 'Electric Piano', type: 'sine', attack: 0.02, decay: 0.4, sustain: 0.4, release: 0.5, cutoff: 2500, resonance: 1.0 },
            { name: 'Rhodes', type: 'sine', attack: 0.05, decay: 0.5, sustain: 0.5, release: 0.6, cutoff: 1500, resonance: 1.2, chorus: 0.15 },
            { name: 'Wurlitzer', type: 'sine', attack: 0.03, decay: 0.45, sustain: 0.4, release: 0.5, cutoff: 1800, resonance: 1.5, distortion: 0.1 },
            { name: 'Harpsichord', type: 'square', attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.2, cutoff: 4000, resonance: 1.0 },
            { name: 'Clavinet', type: 'square', attack: 0.01, decay: 0.15, sustain: 0.2, release: 0.15, cutoff: 2800, resonance: 2.5, distortion: 0.05 },
            { name: 'Celesta', type: 'sine', attack: 0.01, decay: 0.6, sustain: 0.1, release: 0.8, cutoff: 3000, resonance: 1.0 }
        ]
    },
    {
        name: 'Cordas',
        types: [
            { name: 'Violin', type: 'sawtooth', attack: 0.15, decay: 0.1, sustain: 0.9, release: 0.4, cutoff: 2200, resonance: 1.5 },
            { name: 'Viola', type: 'sawtooth', attack: 0.18, decay: 0.15, sustain: 0.85, release: 0.45, cutoff: 1800, resonance: 1.3 },
            { name: 'Cello', type: 'sawtooth', attack: 0.22, decay: 0.2, sustain: 0.8, release: 0.5, cutoff: 1200, resonance: 1.2 },
            { name: 'Contrabass', type: 'sawtooth', attack: 0.28, decay: 0.25, sustain: 0.75, release: 0.6, cutoff: 700, resonance: 1.0 },
            { name: 'String Ensemble', type: 'sawtooth', attack: 0.35, decay: 0.15, sustain: 0.95, release: 0.65, cutoff: 2000, resonance: 1.4, chorus: 0.2 },
            { name: 'Pizzicato Strings', type: 'triangle', attack: 0.01, decay: 0.1, sustain: 0.0, release: 0.1, cutoff: 2500, resonance: 2.0 },
            { name: 'Tremolo Strings', type: 'sawtooth', attack: 0.12, decay: 0.1, sustain: 0.9, release: 0.4, cutoff: 2400, resonance: 1.8, chorus: 0.25 },
            { name: 'Orchestral Strings', type: 'sawtooth', attack: 0.3, decay: 0.2, sustain: 0.9, release: 0.6, cutoff: 1900, resonance: 1.2, reverb: 0.2 }
        ]
    },
    {
        name: 'Metais',
        types: [
            { name: 'Trumpet', type: 'sawtooth', attack: 0.06, decay: 0.15, sustain: 0.85, release: 0.2, cutoff: 3500, resonance: 2.0 },
            { name: 'Trombone', type: 'sawtooth', attack: 0.1, decay: 0.2, sustain: 0.8, release: 0.25, cutoff: 2200, resonance: 1.8 },
            { name: 'French Horn', type: 'triangle', attack: 0.15, decay: 0.25, sustain: 0.8, release: 0.45, cutoff: 1500, resonance: 1.2 },
            { name: 'Tuba', type: 'square', attack: 0.2, decay: 0.3, sustain: 0.7, release: 0.35, cutoff: 800, resonance: 1.5 },
            { name: 'Brass Ensemble', type: 'sawtooth', attack: 0.1, decay: 0.18, sustain: 0.9, release: 0.3, cutoff: 3000, resonance: 1.6, chorus: 0.15 }
        ]
    },
    {
        name: 'Madeiras',
        types: [
            { name: 'Flute', type: 'sine', attack: 0.08, decay: 0.15, sustain: 0.8, release: 0.25, cutoff: 2500, resonance: 1.0 },
            { name: 'Piccolo', type: 'sine', attack: 0.05, decay: 0.1, sustain: 0.85, release: 0.2, cutoff: 4500, resonance: 1.2 },
            { name: 'Oboe', type: 'sawtooth', attack: 0.06, decay: 0.12, sustain: 0.88, release: 0.22, cutoff: 2800, resonance: 1.5 },
            { name: 'Clarinet', type: 'triangle', attack: 0.07, decay: 0.15, sustain: 0.82, release: 0.25, cutoff: 2200, resonance: 1.1 },
            { name: 'Bassoon', type: 'sawtooth', attack: 0.1, decay: 0.18, sustain: 0.8, release: 0.3, cutoff: 1400, resonance: 1.3 },
            { name: 'Pan Flute', type: 'sine', attack: 0.12, decay: 0.2, sustain: 0.75, release: 0.35, cutoff: 2000, resonance: 1.0 },
            { name: 'Aulos', type: 'triangle', attack: 0.1, decay: 0.15, sustain: 0.78, release: 0.3, cutoff: 1800, resonance: 1.8 }
        ]
    },
    {
        name: 'Coros',
        types: [
            { name: 'Choir Aah', type: 'triangle', attack: 0.3, decay: 0.2, sustain: 0.8, release: 0.5, cutoff: 1800, resonance: 1.2, chorus: 0.2 },
            { name: 'Choir Ooh', type: 'sine', attack: 0.4, decay: 0.25, sustain: 0.85, release: 0.6, cutoff: 1200, resonance: 1.0, chorus: 0.15 },
            { name: 'Male Choir', type: 'sawtooth', attack: 0.35, decay: 0.3, sustain: 0.75, release: 0.55, cutoff: 1000, resonance: 1.5, chorus: 0.25 },
            { name: 'Female Choir', type: 'triangle', attack: 0.28, decay: 0.2, sustain: 0.82, release: 0.48, cutoff: 2200, resonance: 1.3, chorus: 0.2 },
            { name: 'Gregorian Choir', type: 'triangle', attack: 0.45, decay: 0.35, sustain: 0.8, release: 0.7, cutoff: 1400, resonance: 1.1, reverb: 0.4 },
            { name: 'Epic Choir', type: 'sawtooth', attack: 0.3, decay: 0.2, sustain: 0.9, release: 0.6, cutoff: 2400, resonance: 1.8, chorus: 0.3, reverb: 0.5 }
        ]
    },
    {
        name: 'Cordas Dedilhadas',
        types: [
            { name: 'Acoustic Guitar', type: 'triangle', attack: 0.01, decay: 0.35, sustain: 0.15, release: 0.4, cutoff: 2800, resonance: 1.8 },
            { name: 'Nylon Guitar', type: 'triangle', attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.35, cutoff: 2000, resonance: 1.5 },
            { name: 'Electric Guitar Clean', type: 'sine', attack: 0.01, decay: 0.28, sustain: 0.22, release: 0.3, cutoff: 2200, resonance: 1.2, chorus: 0.1 },
            { name: 'Electric Guitar Distorted', type: 'sawtooth', attack: 0.02, decay: 0.2, sustain: 0.75, release: 0.25, cutoff: 1800, resonance: 2.0, distortion: 0.4 },
            { name: 'Bass Guitar', type: 'triangle', attack: 0.02, decay: 0.4, sustain: 0.3, release: 0.25, cutoff: 800, resonance: 1.5 },
            { name: 'Harp', type: 'sine', attack: 0.01, decay: 0.6, sustain: 0.05, release: 1.0, cutoff: 2500, resonance: 1.0 },
            { name: 'Lute', type: 'triangle', attack: 0.01, decay: 0.22, sustain: 0.05, release: 0.25, cutoff: 1900, resonance: 1.6 },
            { name: 'Mandolin', type: 'triangle', attack: 0.01, decay: 0.18, sustain: 0.0, release: 0.2, cutoff: 3000, resonance: 2.2 }
        ]
    },
    {
        name: 'Sintetizadores Basicos',
        types: [
            { name: 'Sine', type: 'sine', attack: 0.02, decay: 0.3, sustain: 0.5, release: 0.2, cutoff: 1500, resonance: 1.0 },
            { name: 'Triangle', type: 'triangle', attack: 0.02, decay: 0.3, sustain: 0.5, release: 0.2, cutoff: 1500, resonance: 1.0 },
            { name: 'Sawtooth', type: 'sawtooth', attack: 0.02, decay: 0.3, sustain: 0.5, release: 0.2, cutoff: 1500, resonance: 1.0 },
            { name: 'Square', type: 'square', attack: 0.02, decay: 0.3, sustain: 0.5, release: 0.2, cutoff: 1500, resonance: 1.0 },
            { name: 'Noise', type: 'snare', attack: 0.01, decay: 0.15, sustain: 0.0, release: 0.1, cutoff: 8000, resonance: 1.0 },
            { name: 'Pulse', type: 'square', attack: 0.02, decay: 0.25, sustain: 0.4, release: 0.25, cutoff: 2200, resonance: 3.0 },
            { name: 'Supersaw', type: 'sawtooth', attack: 0.05, decay: 0.4, sustain: 0.6, release: 0.35, cutoff: 3500, resonance: 2.0, chorus: 0.4 },
            { name: 'FM Bell', type: 'sine', attack: 0.005, decay: 0.8, sustain: 0.1, release: 1.0, cutoff: 4000, resonance: 4.0, delay: 0.2 },
            { name: 'FM Bass', type: 'sawtooth', attack: 0.02, decay: 0.25, sustain: 0.7, release: 0.22, cutoff: 800, resonance: 3.5 },
            { name: 'Analog Pad', type: 'sawtooth', attack: 0.5, decay: 0.4, sustain: 0.8, release: 0.8, cutoff: 1200, resonance: 1.5, chorus: 0.2 },
            { name: 'Digital Pad', type: 'triangle', attack: 0.6, decay: 0.5, sustain: 0.85, release: 1.2, cutoff: 2500, resonance: 1.0, reverb: 0.3 }
        ]
    },
    {
        name: 'Leads',
        types: [
            { name: 'Saw Lead', type: 'sawtooth', attack: 0.01, decay: 0.2, sustain: 0.6, release: 0.25, cutoff: 2500, resonance: 3.0 },
            { name: 'Square Lead', type: 'square', attack: 0.01, decay: 0.15, sustain: 0.5, release: 0.2, cutoff: 3000, resonance: 2.5 },
            { name: 'Mono Lead', type: 'sawtooth', attack: 0.02, decay: 0.22, sustain: 0.7, release: 0.2, cutoff: 1800, resonance: 4.0, distortion: 0.15 },
            { name: 'Acid Lead', type: 'sawtooth', attack: 0.01, decay: 0.18, sustain: 0.2, release: 0.12, cutoff: 1000, resonance: 8.0, distortion: 0.3 },
            { name: 'Chiptune Lead', type: 'square', attack: 0.0, decay: 0.08, sustain: 0.4, release: 0.08, cutoff: 6000, resonance: 1.0 },
            { name: 'Fantasy Lead', type: 'triangle', attack: 0.05, decay: 0.35, sustain: 0.5, release: 0.4, cutoff: 2200, resonance: 2.5, chorus: 0.2, delay: 0.25 }
        ]
    },
    {
        name: 'Pads',
        types: [
            { name: 'Warm Pad', type: 'triangle', attack: 0.6, decay: 0.4, sustain: 0.9, release: 0.8, cutoff: 1000, resonance: 1.2 },
            { name: 'Choir Pad', type: 'sawtooth', attack: 0.5, decay: 0.3, sustain: 0.85, release: 0.9, cutoff: 1600, resonance: 1.5, chorus: 0.3 },
            { name: 'Space Pad', type: 'sine', attack: 0.8, decay: 0.5, sustain: 0.95, release: 1.5, cutoff: 1400, resonance: 1.0, reverb: 0.5 },
            { name: 'Dream Pad', type: 'triangle', attack: 0.7, decay: 0.4, sustain: 0.88, release: 1.2, cutoff: 2000, resonance: 1.0, chorus: 0.2, reverb: 0.3 },
            { name: 'Dark Pad', type: 'square', attack: 0.9, decay: 0.6, sustain: 0.8, release: 1.8, cutoff: 600, resonance: 1.4 },
            { name: 'Ice Pad', type: 'sine', attack: 0.5, decay: 0.8, sustain: 0.7, release: 1.4, cutoff: 3500, resonance: 3.0, chorus: 0.1, delay: 0.3 }
        ]
    },
    {
        name: 'Baixos',
        types: [
            { name: 'Sub Bass', type: 'sine', attack: 0.05, decay: 0.6, sustain: 0.8, release: 0.5, cutoff: 150, resonance: 1.0 },
            { name: '808 Bass', type: 'kick_deep', attack: 0.01, decay: 0.8, sustain: 0.0, release: 0.8, cutoff: 80, resonance: 1.0 },
            { name: 'Analog Bass', type: 'sawtooth', attack: 0.02, decay: 0.35, sustain: 0.6, release: 0.25, cutoff: 600, resonance: 2.0 },
            { name: 'FM Bass', type: 'sawtooth', attack: 0.01, decay: 0.22, sustain: 0.75, release: 0.2, cutoff: 900, resonance: 3.0 },
            { name: 'Acid Bass', type: 'sawtooth', attack: 0.01, decay: 0.15, sustain: 0.5, release: 0.1, cutoff: 500, resonance: 6.0, distortion: 0.2 },
            { name: 'Synth Bass', type: 'square', attack: 0.02, decay: 0.28, sustain: 0.7, release: 0.22, cutoff: 750, resonance: 1.8 },
            { name: 'Moog Bass', type: 'sawtooth', attack: 0.03, decay: 0.4, sustain: 0.65, release: 0.3, cutoff: 450, resonance: 3.5 }
        ]
    },
    {
        name: 'FX / Ambiencia',
        types: [
            { name: 'Reverse Cymbal', type: 'hihat_open', attack: 1.5, decay: 0.1, sustain: 1.0, release: 0.1, cutoff: 5000, resonance: 1.0 },
            { name: 'Wind', type: 'snare', attack: 1.2, decay: 0.5, sustain: 0.9, release: 1.5, cutoff: 3000, resonance: 1.2, chorus: 0.3 },
            { name: 'Rain', type: 'snare', attack: 0.5, decay: 0.3, sustain: 0.95, release: 0.8, cutoff: 4500, resonance: 1.0, chorus: 0.1 },
            { name: 'Thunder', type: 'kick_deep', attack: 0.1, decay: 1.5, sustain: 0.0, release: 2.0, cutoff: 120, resonance: 1.5, reverb: 0.6 },
            { name: 'Fire', type: 'snare', attack: 0.05, decay: 0.08, sustain: 0.8, release: 0.1, cutoff: 6000, resonance: 2.0, distortion: 0.3 },
            { name: 'Ocean Waves', type: 'snare', attack: 2.5, decay: 1.0, sustain: 0.95, release: 2.5, cutoff: 2500, resonance: 1.0, chorus: 0.2, reverb: 0.4 },
            { name: 'Cave Ambience', type: 'sine', attack: 0.5, decay: 1.0, sustain: 0.7, release: 2.0, cutoff: 900, resonance: 2.0, delay: 0.5, reverb: 0.8 },
            { name: 'Crowd', type: 'snare', attack: 0.8, decay: 0.4, sustain: 0.9, release: 1.0, cutoff: 2200, resonance: 1.0, chorus: 0.4 },
            { name: 'Explosion', type: 'kick_deep', attack: 0.01, decay: 2.5, sustain: 0.0, release: 3.0, cutoff: 350, resonance: 2.0, distortion: 0.5, reverb: 0.7 },
            { name: 'Sword Clash', type: 'triangle', attack: 0.005, decay: 0.08, sustain: 0.0, release: 0.08, cutoff: 7500, resonance: 5.0, delay: 0.1 },
            { name: 'Metal Hit', type: 'square', attack: 0.005, decay: 0.15, sustain: 0.0, release: 0.15, cutoff: 5000, resonance: 4.5, distortion: 0.2 },
            { name: 'Magic Sparkle', type: 'sine', attack: 0.01, decay: 0.4, sustain: 0.2, release: 0.8, cutoff: 6500, resonance: 6.0, delay: 0.3, reverb: 0.5 },
            { name: 'Heartbeat', type: 'sine', attack: 0.05, decay: 0.12, sustain: 0.0, release: 0.1, cutoff: 80, resonance: 1.2 }
        ]
    },
    {
        name: 'Medieval / Epico',
        types: [
            { name: 'Taiko', type: 'kick_deep', attack: 0.01, decay: 0.5, sustain: 0.0, release: 0.5, cutoff: 160, resonance: 1.4, distortion: 0.1 },
            { name: 'War Horn', type: 'sawtooth', attack: 0.18, decay: 0.3, sustain: 0.85, release: 0.5, cutoff: 1400, resonance: 2.0, distortion: 0.1 },
            { name: 'Battle Drum', type: 'kick_deep', attack: 0.01, decay: 0.4, sustain: 0.05, release: 0.4, cutoff: 130, resonance: 1.6, reverb: 0.3 },
            { name: 'Bell Tower', type: 'sine', attack: 0.005, decay: 1.5, sustain: 0.0, release: 2.0, cutoff: 2800, resonance: 3.5, reverb: 0.5 },
            { name: 'Church Bell', type: 'sine', attack: 0.01, decay: 2.0, sustain: 0.05, release: 2.5, cutoff: 1800, resonance: 3.0, reverb: 0.6 },
            { name: 'Dulcimer', type: 'triangle', attack: 0.008, decay: 0.25, sustain: 0.05, release: 0.3, cutoff: 2400, resonance: 2.2 },
            { name: 'Bagpipe', type: 'sawtooth', attack: 0.25, decay: 0.15, sustain: 0.95, release: 0.4, cutoff: 2200, resonance: 2.5 },
            { name: 'Lute', type: 'triangle', attack: 0.01, decay: 0.24, sustain: 0.05, release: 0.28, cutoff: 1700, resonance: 1.5 },
            { name: 'Epic Percussion', type: 'kick_deep', attack: 0.01, decay: 0.6, sustain: 0.1, release: 0.6, cutoff: 220, resonance: 1.5, distortion: 0.2, reverb: 0.4 },
            { name: 'Ancient Flute', type: 'sine', attack: 0.1, decay: 0.18, sustain: 0.78, release: 0.3, cutoff: 1900, resonance: 1.1, reverb: 0.3 }
        ]
    },
    {
        name: 'Chiptune / Retro',
        types: [
            { name: 'NES Square', type: 'square', attack: 0.0, decay: 0.12, sustain: 0.5, release: 0.12, cutoff: 8000, resonance: 1.0 },
            { name: 'NES Triangle', type: 'triangle', attack: 0.0, decay: 0.15, sustain: 0.6, release: 0.15, cutoff: 8000, resonance: 1.0 },
            { name: 'GameBoy Pulse', type: 'square', attack: 0.0, decay: 0.1, sustain: 0.4, release: 0.1, cutoff: 6000, resonance: 2.0 },
            { name: 'SID Lead', type: 'sawtooth', attack: 0.01, decay: 0.22, sustain: 0.7, release: 0.22, cutoff: 3500, resonance: 2.5 },
            { name: 'Retro Bass', type: 'sawtooth', attack: 0.01, decay: 0.2, sustain: 0.65, release: 0.2, cutoff: 1200, resonance: 1.8 },
            { name: 'Retro Noise Drum', type: 'snare', attack: 0.0, decay: 0.08, sustain: 0.0, release: 0.08, cutoff: 9000, resonance: 1.0 }
        ]
    },
    {
        name: 'EDM / Trap',
        types: [
            { name: 'Pluck', type: 'triangle', attack: 0.005, decay: 0.12, sustain: 0.0, release: 0.1, cutoff: 2000, resonance: 3.5, delay: 0.2 },
            { name: 'Future Bass', type: 'sawtooth', attack: 0.08, decay: 0.35, sustain: 0.55, release: 0.3, cutoff: 2800, resonance: 1.8, chorus: 0.35 },
            { name: 'Reese Bass', type: 'sawtooth', attack: 0.12, decay: 0.45, sustain: 0.85, release: 0.4, cutoff: 700, resonance: 1.5, chorus: 0.4 },
            { name: 'Growl Bass', type: 'sawtooth', attack: 0.05, decay: 0.3, sustain: 0.7, release: 0.3, cutoff: 900, resonance: 4.5, distortion: 0.35 },
            { name: 'Dubstep Wobble', type: 'sawtooth', attack: 0.03, decay: 0.25, sustain: 0.5, release: 0.25, cutoff: 1400, resonance: 5.0, distortion: 0.15 },
            { name: 'Trap Bell', type: 'sine', attack: 0.005, decay: 0.6, sustain: 0.05, release: 0.8, cutoff: 3800, resonance: 2.5, delay: 0.3 },
            { name: 'Trap Lead', type: 'square', attack: 0.01, decay: 0.18, sustain: 0.45, release: 0.2, cutoff: 4500, resonance: 2.0, chorus: 0.15, delay: 0.2 },
            { name: 'Hyper Saw', type: 'sawtooth', attack: 0.04, decay: 0.4, sustain: 0.7, release: 0.3, cutoff: 4000, resonance: 2.5, chorus: 0.5 },
            { name: 'Vocal Chop', type: 'triangle', attack: 0.06, decay: 0.18, sustain: 0.6, release: 0.18, cutoff: 2400, resonance: 3.0, chorus: 0.2 }
        ]
    },
    {
        name: 'Instrumentos Etnicos',
        types: [
            { name: 'Sitar', type: 'sawtooth', attack: 0.01, decay: 0.42, sustain: 0.08, release: 0.38, cutoff: 3500, resonance: 3.2 },
            { name: 'Shamisen', type: 'square', attack: 0.008, decay: 0.16, sustain: 0.05, release: 0.16, cutoff: 2800, resonance: 2.8 },
            { name: 'Koto', type: 'triangle', attack: 0.01, decay: 0.25, sustain: 0.0, release: 0.35, cutoff: 2400, resonance: 1.8 },
            { name: 'Erhu', type: 'sawtooth', attack: 0.12, decay: 0.1, sustain: 0.88, release: 0.35, cutoff: 2600, resonance: 1.5 },
            { name: 'Oud', type: 'sawtooth', attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.3, cutoff: 1900, resonance: 1.6 },
            { name: 'Duduk', type: 'sine', attack: 0.15, decay: 0.22, sustain: 0.72, release: 0.38, cutoff: 1600, resonance: 1.0 },
            { name: 'Kalimba', type: 'sine', attack: 0.005, decay: 0.18, sustain: 0.0, release: 0.22, cutoff: 3200, resonance: 2.0 },
            { name: 'Didgeridoo', type: 'sawtooth', attack: 0.2, decay: 0.4, sustain: 0.85, release: 0.4, cutoff: 550, resonance: 4.0, distortion: 0.15 },
            { name: 'Steel Drum', type: 'triangle', attack: 0.01, decay: 0.45, sustain: 0.12, release: 0.5, cutoff: 3800, resonance: 4.5 },
            { name: 'Pan Flute', type: 'sine', attack: 0.1, decay: 0.18, sustain: 0.78, release: 0.3, cutoff: 2100, resonance: 1.0 }
        ]
    }
];

// Flat list of all types
const allTypes = [];
categories.forEach(cat => {
    cat.types.forEach(t => {
        allTypes.push({
            catName: cat.name,
            baseType: t
        });
    });
});

const totalTypes = allTypes.length; // 140 types
const targetTotal = 600;

// Calculate how many variations each type will have:
// We want: 100 types to have 4 variations, 40 types to have 5 variations.
// Total: 100 * 4 + 40 * 5 = 600.
// Let's mark the first 40 types to have 5 variations, and the remaining 100 to have 4.
const varCounts = Array(totalTypes).fill(4);
for (let i = 0; i < 40; i++) {
    varCounts[i] = 5;
}

let idCounter = 1;

allTypes.forEach((entry, typeIndex) => {
    const catName = entry.catName;
    const baseType = entry.baseType;
    const varCount = varCounts[typeIndex];

    const variations = [
        { suffix: " Standard", mod: (s) => s },
        { suffix: " Warm", mod: (s) => {
            s.attack = Number((s.attack * 1.5 + 0.05).toFixed(3));
            s.decay = Number((s.decay * 1.3).toFixed(3));
            s.release = Number((s.release * 1.4).toFixed(3));
            s.cutoff = Math.floor(s.cutoff * 0.7);
            s.resonance = Number((s.resonance * 0.8).toFixed(2));
            return s;
        }},
        { suffix: " Bright", mod: (s) => {
            s.attack = Number((s.attack * 0.5).toFixed(3));
            s.decay = Number((s.decay * 0.9).toFixed(3));
            s.cutoff = Math.floor(Math.min(12000, s.cutoff * 1.5 + 1000));
            s.resonance = Number((s.resonance * 1.3).toFixed(2));
            return s;
        }},
        { suffix: " Ambient", mod: (s) => {
            s.release = Number((s.release * 2.0 + 0.5).toFixed(3));
            s.reverb = 0.5;
            s.delay = 0.35;
            return s;
        }},
        { suffix: " Vintage", mod: (s) => {
            s.humanize = 0.15;
            s.pitch = Math.random() > 0.5 ? 12 : -12; // octave detune or transpose
            s.chorus = 0.25;
            s.attack = Number((s.attack * 1.2).toFixed(3));
            return s;
        }}
    ];

    for (let i = 0; i < varCount; i++) {
        const variation = variations[i];
        
        // Clone settings
        const settings = {
            attack: baseType.attack,
            decay: baseType.decay,
            sustain: baseType.sustain,
            release: baseType.release,
            cutoff: baseType.cutoff,
            resonance: baseType.resonance,
            delay: baseType.delay || 0.0,
            reverb: baseType.reverb || 0.0,
            chorus: baseType.chorus || 0.0,
            distortion: baseType.distortion || 0.0,
            humanize: 0.0,
            pitch: 0
        };

        // Apply variation modifier
        const finalSettings = variation.mod(settings);

        instruments.push({
            id: "inst_" + idCounter++,
            name: baseType.name + variation.suffix,
            category: catName,
            type: baseType.type,
            attack: finalSettings.attack,
            decay: finalSettings.decay,
            sustain: finalSettings.sustain,
            release: finalSettings.release,
            filterCutoff: finalSettings.cutoff,
            filterResonance: finalSettings.resonance,
            delayMix: finalSettings.delay,
            delayTime: 0.25,
            reverbWet: finalSettings.reverb,
            chorusWet: finalSettings.chorus,
            distortionDrive: finalSettings.distortion,
            pitchOffset: finalSettings.pitch,
            humanize: finalSettings.humanize
        });
    }
});

// Add custom legacy instruments used in previous compositions
const legacyInstruments = [
    // --- Vengeful Spartan ---
    {
        id: "inst_legacy_spartan_kick",
        name: "Kick Spartan",
        category: "Bateria Acustica",
        type: "kick",
        attack: 0.00,
        decay: 0.15,
        sustain: 0.00,
        release: 0.10,
        filterCutoff: 100,
        filterResonance: 1.0,
        delayMix: 0.00,
        delayTime: 0.25,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.00
    },
    {
        id: "inst_legacy_spartan_perc",
        name: "Perc Spartan",
        category: "Bateria Acustica",
        type: "snare",
        attack: 0.01,
        decay: 0.20,
        sustain: 0.00,
        release: 0.15,
        filterCutoff: 1200,
        filterResonance: 1.0,
        delayMix: 0.15,
        delayTime: 0.15,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.00
    },
    {
        id: "inst_legacy_spartan_bass",
        name: "Bass Spartan",
        category: "Baixos",
        type: "sawtooth",
        attack: 0.10,
        decay: 0.50,
        sustain: 0.80,
        release: 0.40,
        filterCutoff: 600,
        filterResonance: 1.5,
        delayMix: 0.00,
        delayTime: 0.25,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.00
    },
    {
        id: "inst_legacy_spartan_guitar",
        name: "Guitar Lyre Spartan",
        category: "Cordas Dedilhadas",
        type: "triangle",
        attack: 0.00,
        decay: 0.35,
        sustain: 0.20,
        release: 0.30,
        filterCutoff: 2500,
        filterResonance: 3.5,
        delayMix: 0.30,
        delayTime: 0.20,
        reverbWet: 0.35,
        chorusWet: 0.20,
        distortionDrive: 0.05,
        pitchOffset: 12,
        humanize: 0.05
    },
    {
        id: "inst_legacy_spartan_brass",
        name: "Brass Spartan",
        category: "Metais",
        type: "sawtooth",
        attack: 0.08,
        decay: 0.40,
        sustain: 0.60,
        release: 0.35,
        filterCutoff: 1500,
        filterResonance: 2.0,
        delayMix: 0.25,
        delayTime: 0.30,
        reverbWet: 0.40,
        chorusWet: 0.10,
        distortionDrive: 0.10,
        pitchOffset: 0,
        humanize: 0.00
    },
    {
        id: "inst_legacy_spartan_strings",
        name: "Strings Spartan",
        category: "Cordas",
        type: "sawtooth",
        attack: 0.15,
        decay: 0.60,
        sustain: 0.70,
        release: 0.50,
        filterCutoff: 1000,
        filterResonance: 1.2,
        delayMix: 0.40,
        delayTime: 0.35,
        reverbWet: 0.60,
        chorusWet: 0.40,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.01
    },
    // --- Colossus of Rhodes ---
    {
        id: "inst_legacy_colossus_timpani",
        name: "Timpani Colossus",
        category: "Bateria Acustica",
        type: "kick_deep",
        attack: 0.00,
        decay: 0.40,
        sustain: 0.00,
        release: 0.15,
        filterCutoff: 60,
        filterResonance: 1.0,
        delayMix: 0.15,
        delayTime: 0.25,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.05
    },
    {
        id: "inst_legacy_colossus_wardrum",
        name: "War Drum Colossus",
        category: "Bateria Acustica",
        type: "snare",
        attack: 0.00,
        decay: 0.20,
        sustain: 0.00,
        release: 0.10,
        filterCutoff: 600,
        filterResonance: 2.5,
        delayMix: 0.10,
        delayTime: 0.15,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: -3,
        humanize: 0.08
    },
    {
        id: "inst_legacy_colossus_cymbal",
        name: "Cymbal Colossus",
        category: "Bateria Acustica",
        type: "hihat_open",
        attack: 0.00,
        decay: 0.45,
        sustain: 0.00,
        release: 0.30,
        filterCutoff: 5500,
        filterResonance: 1.0,
        delayMix: 0.20,
        delayTime: 0.20,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.03
    },
    {
        id: "inst_legacy_colossus_bass",
        name: "Bass Colossus",
        category: "Baixos",
        type: "sawtooth",
        attack: 0.03,
        decay: 0.40,
        sustain: 0.75,
        release: 0.30,
        filterCutoff: 320,
        filterResonance: 2.0,
        delayMix: 0.08,
        delayTime: 0.20,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: -12,
        humanize: 0.06
    },
    {
        id: "inst_legacy_colossus_strings",
        name: "Strings Tremolo Colossus",
        category: "Cordas",
        type: "triangle",
        attack: 0.01,
        decay: 0.10,
        sustain: 0.30,
        release: 0.08,
        filterCutoff: 2200,
        filterResonance: 3.5,
        delayMix: 0.15,
        delayTime: 0.12,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 12,
        humanize: 0.12
    },
    {
        id: "inst_legacy_colossus_strings2",
        name: "Strings Melodic Colossus",
        category: "Cordas",
        type: "triangle",
        attack: 0.08,
        decay: 0.45,
        sustain: 0.70,
        release: 0.40,
        filterCutoff: 1600,
        filterResonance: 2.5,
        delayMix: 0.30,
        delayTime: 0.25,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 12,
        humanize: 0.10
    },
    {
        id: "inst_legacy_colossus_brass",
        name: "Brass Massive Colossus",
        category: "Metais",
        type: "sawtooth",
        attack: 0.06,
        decay: 0.40,
        sustain: 0.80,
        release: 0.35,
        filterCutoff: 1100,
        filterResonance: 4.5,
        delayMix: 0.20,
        delayTime: 0.18,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.08
    },
    {
        id: "inst_legacy_colossus_choir",
        name: "Choir Gregorian Colossus",
        category: "Coros",
        type: "sine",
        attack: 0.18,
        decay: 0.60,
        sustain: 0.85,
        release: 0.70,
        filterCutoff: 800,
        filterResonance: 2.0,
        delayMix: 0.40,
        delayTime: 0.35,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 12,
        humanize: 0.12
    },
    // --- Cyberpunk Chill ---
    {
        id: "inst_legacy_cyberpunk_bumbo",
        name: "Bumbo Cyberpunk",
        category: "Bateria Acustica",
        type: "kick_deep",
        attack: 0.00,
        decay: 0.25,
        sustain: 0.00,
        release: 0.10,
        filterCutoff: 90,
        filterResonance: 1.0,
        delayMix: 0.00,
        delayTime: 0.00,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.05
    },
    {
        id: "inst_legacy_cyberpunk_caixa",
        name: "Caixa Cyberpunk",
        category: "Bateria Acustica",
        type: "snare",
        attack: 0.00,
        decay: 0.15,
        sustain: 0.00,
        release: 0.08,
        filterCutoff: 1200,
        filterResonance: 1.5,
        delayMix: 0.10,
        delayTime: 0.20,
        reverbWet: 0.45,
        chorusWet: 0.10,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.05
    },
    {
        id: "inst_legacy_cyberpunk_hats",
        name: "Hats Cyberpunk",
        category: "Bateria Acustica",
        type: "hihat",
        attack: 0.00,
        decay: 0.05,
        sustain: 0.00,
        release: 0.05,
        filterCutoff: 7000,
        filterResonance: 1.0,
        delayMix: 0.00,
        delayTime: 0.00,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.08
    },
    {
        id: "inst_legacy_cyberpunk_baixo",
        name: "Baixo Cyberpunk",
        category: "Baixos",
        type: "sawtooth",
        attack: 0.02,
        decay: 0.30,
        sustain: 0.70,
        release: 0.20,
        filterCutoff: 450,
        filterResonance: 2.0,
        delayMix: 0.00,
        delayTime: 0.00,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.15,
        pitchOffset: -12,
        humanize: 0.05
    },
    {
        id: "inst_legacy_cyberpunk_melodia",
        name: "Melodia Cyberpunk",
        category: "Leads",
        type: "square",
        attack: 0.01,
        decay: 0.18,
        sustain: 0.35,
        release: 0.15,
        filterCutoff: 2500,
        filterResonance: 4.0,
        delayMix: 0.40,
        delayTime: 0.30,
        reverbWet: 0.35,
        chorusWet: 0.40,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.15
    },
    {
        id: "inst_legacy_cyberpunk_fundo",
        name: "Fundo Cyberpunk",
        category: "Pads",
        type: "sine",
        attack: 0.35,
        decay: 0.80,
        sustain: 0.80,
        release: 0.60,
        filterCutoff: 800,
        filterResonance: 1.0,
        delayMix: 0.50,
        delayTime: 0.45,
        reverbWet: 0.70,
        chorusWet: 0.20,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.02
    },
    // --- Projeto Musica ---
    {
        id: "inst_musica_timpani",
        name: "Timpani Musica",
        category: "Projeto Musica",
        type: "kick_deep",
        attack: 0.02,
        decay: 0.26,
        sustain: 0.15,
        release: 0.15,
        filterCutoff: 1310,
        filterResonance: 0.1,
        delayMix: 0.00,
        delayTime: 0.15,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: -2,
        humanize: 0.30,
        sustainPedal: true
    },
    {
        id: "inst_musica_wardrum",
        name: "War Drum Musica",
        category: "Projeto Musica",
        type: "snare",
        attack: 0.02,
        decay: 0.20,
        sustain: 0.50,
        release: 0.10,
        filterCutoff: 600,
        filterResonance: 2.5,
        delayMix: 0.10,
        delayTime: 0.15,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: -3,
        humanize: 0.08,
        sustainPedal: false
    },
    {
        id: "inst_musica_cymbal",
        name: "Cymbal Musica",
        category: "Projeto Musica",
        type: "hihat_open",
        attack: 0.02,
        decay: 0.45,
        sustain: 0.50,
        release: 0.30,
        filterCutoff: 5500,
        filterResonance: 1.0,
        delayMix: 0.20,
        delayTime: 0.20,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.03,
        sustainPedal: false
    },
    {
        id: "inst_musica_bass",
        name: "Bass Musica",
        category: "Projeto Musica",
        type: "sawtooth",
        attack: 0.03,
        decay: 0.40,
        sustain: 0.75,
        release: 0.30,
        filterCutoff: 320,
        filterResonance: 2.0,
        delayMix: 0.08,
        delayTime: 0.20,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: -12,
        humanize: 0.06,
        sustainPedal: false
    },
    {
        id: "inst_musica_strings",
        name: "Strings Musica",
        category: "Projeto Musica",
        type: "triangle",
        attack: 0.01,
        decay: 0.10,
        sustain: 0.30,
        release: 0.08,
        filterCutoff: 2200,
        filterResonance: 3.5,
        delayMix: 0.15,
        delayTime: 0.12,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 12,
        humanize: 0.12,
        sustainPedal: false
    },
    {
        id: "inst_musica_strings2",
        name: "Strings2 Musica",
        category: "Projeto Musica",
        type: "triangle",
        attack: 0.08,
        decay: 0.45,
        sustain: 0.70,
        release: 0.40,
        filterCutoff: 1600,
        filterResonance: 2.5,
        delayMix: 0.30,
        delayTime: 0.25,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 12,
        humanize: 0.10,
        sustainPedal: true
    },
    {
        id: "inst_musica_brass",
        name: "Brass Musica",
        category: "Projeto Musica",
        type: "sawtooth",
        attack: 0.06,
        decay: 0.40,
        sustain: 0.80,
        release: 0.35,
        filterCutoff: 1100,
        filterResonance: 4.5,
        delayMix: 0.20,
        delayTime: 0.18,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 0,
        humanize: 0.08,
        sustainPedal: true
    },
    {
        id: "inst_musica_choir",
        name: "Choir Musica",
        category: "Projeto Musica",
        type: "sine",
        attack: 0.18,
        decay: 0.60,
        sustain: 0.85,
        release: 0.70,
        filterCutoff: 800,
        filterResonance: 2.0,
        delayMix: 0.40,
        delayTime: 0.35,
        reverbWet: 0.00,
        chorusWet: 0.00,
        distortionDrive: 0.00,
        pitchOffset: 12,
        humanize: 0.12,
        sustainPedal: true
    }
];

instruments.push(...legacyInstruments);

fs.writeFileSync('public/instruments.json', JSON.stringify(instruments, null, 4));
console.log(`Gerado exatamente ${instruments.length} instrumentos em public/instruments.json (incluindo 28 lendários/cyberpunk/musica)`);
