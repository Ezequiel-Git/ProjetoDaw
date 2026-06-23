// --- UTILS ENGINE ---

export function isDrumType(type) {
            return [
                'kick', 'kick_deep', 'kick_heavy', 'kick_soft', 'kick_lofi',
                'snare', 'snare_soft', 'snare_electro', 'snare_lofi',
                'hihat', 'hihat_open', 'hihat_pedal',
                'clap', 'clap_acoustic',
                'rimshot', 'tom', 'cowbell', 'tambourine', 'shaker',
                'conga', 'bongo', 'percussion_hand', 'crash', 'ride'
            ].includes(type);
        }

export function scheduleNodeCleanup(ctx, time, duration, nodes = [], sources = []) {
            if (!ctx || ctx instanceof (window.OfflineAudioContext || window.webkitOfflineAudioContext)) return;
            const delayFromNow = Math.max(0, time - ctx.currentTime);
            setTimeout(() => {
                nodes.forEach(n => {
                    try { if (n && n.disconnect) n.disconnect(); } catch(e) {}
                });
                sources.forEach(s => {
                    try { if (s && s.disconnect) s.disconnect(); } catch(e) {}
                });
            }, (delayFromNow + duration + 0.3) * 1000);
        }

export function triggerMetronomeClick(ctx, time, isDownbeat) {
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc.frequency.setValueAtTime(isDownbeat ? 1000 : 700, time);
            osc.type = 'triangle';
            
            gainNode.gain.setValueAtTime(0, time);
            gainNode.gain.linearRampToValueAtTime(0.08, time + 0.002);
            gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
            
            osc.start(time);
            osc.stop(time + 0.06);
        }


// --- NOTE CONVERSION UTILS ---
// Frequências das Notas
        export const noteFrequencies = {
            'C': 16.35, 'C#': 17.32, 'Db': 17.32, 'D': 18.35, 'D#': 19.45, 'Eb': 19.45, 'E': 20.60,
            'F': 21.83, 'F#': 23.12, 'Gb': 23.12, 'G': 24.50, 'G#': 25.96, 'Ab': 25.96, 'A': 27.50,
            'A#': 29.14, 'Bb': 29.14, 'B': 30.87
        };

        export function noteToFreq(noteStr) {
            if (typeof noteStr !== 'string') return 0;
            const match = noteStr.match(/^([A-G]#?|D[b#]|E[b]|G[b]|A[b]|B[b])(\d)$/i);
            if (!match) return 0;
            const note = match[1].toUpperCase();
            const octave = parseInt(match[2]);
            const baseFreq = noteFrequencies[note];
            if (!baseFreq) return 0;
            return baseFreq * Math.pow(2, octave);
        }

        export const noteMidiOffsets = {
            'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
            'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9,
            'A#': 10, 'Bb': 10, 'B': 11
        };

        export function noteToMidi(noteStr) {
            if (typeof noteStr !== 'string') return 0;
            const match = noteStr.match(/^([A-G]#?|D[b#]|E[b]|G[b]|A[b]|B[b])(\d)$/i);
            if (!match) return 0;
            const note = match[1].toUpperCase();
            const octave = parseInt(match[2]);
            const offset = noteMidiOffsets[note];
            if (offset === undefined) return 0;
            return 12 + octave * 12 + offset;
        }
