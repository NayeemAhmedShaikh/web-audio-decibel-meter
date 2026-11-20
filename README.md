# Web Audio Decibel & Acoustics Toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![Standards](https://img.shields.io/badge/Standards-IEC%2061672--1%20%7C%20ISO%209613--2-green)](#standards)

A lightweight, zero-dependency TypeScript/JavaScript library providing the core DSP formulas for browser-based sound level meters, frequency weighting curves, and environmental acoustic calculators.

Developed by [Nayeem](https://soundleveltest.com/author/nayeem) as the foundational acoustic mathematics powering [SoundLevelTest.com](https://soundleveltest.com).

---

## Live Web Demonstrations

These formulas run client-side in the browser via the HTML5 Web Audio API:

- **[Online Decibel Sound Meter](https://soundleveltest.com/)**: Real-time microphone SPL meter with A-weighting and C-weighting filters.
- **[Decibel Chart & Equivalent Lookup](https://soundleveltest.com/decibel-chart)**: Comprehensive 30 to 130 dB reference scale with everyday comparisons.
- **[Decibel Addition Calculator](https://soundleveltest.com/decibel-addition-calculator)**: Logarithmic acoustic power summation for multiple noise sources.
- **[Sound Distance Drop-Off Calculator](https://soundleveltest.com/sound-distance-calculator)**: Spherical inverse-square law and line-source attenuation.
- **[Residential Noise Limits Guide](https://soundleveltest.com/residential-noise-limits)**: Legal day/night noise thresholds and municipal ordinance codes.

---

## Features & Standards

1. **IEC 61672-1:2013 A-Weighting Filter (`aWeighting`)**
   - Implements the international standard weighting curve that matches human ear perception (40-phon Fletcher-Munson equal-loudness curve).
   - Normalised to $0\text{ dB}$ at $1\text{ kHz}$ ($R_A(f)$ analog filter poles).

2. **IEC 61672-1:2013 C-Weighting Filter (`cWeighting`)**
   - Flat response across the audible spectrum ($31.5\text{ Hz}$ to $8\text{ kHz}$) with rolloffs at frequency extremes.
   - Ideal for low-frequency bass analysis, engine rumble, and industrial peak limits.

3. **Incoherent Acoustic Power Summation (`addIncoherentDecibels`)**
   - Acoustic decibels are logarithmic and cannot be added linearly ($60\text{ dB} + 60\text{ dB} \neq 120\text{ dB}$).
   - Solves $L_{\text{total}} = 10 \cdot \log_{10}\left(\sum_{i=1}^{n} 10^{L_i / 10}\right)$.

4. **Point & Line Source Distance Propagation (`soundDistanceDrop`)**
   - Spherical point source: $20 \cdot \log_{10}(d_2 / d_1)$ ($\approx 6\text{ dB}$ loss per doubling of distance).
   - Cylindrical line source (road traffic): $10 \cdot \log_{10}(d_2 / d_1)$ ($\approx 3\text{ dB}$ loss per doubling).

---

## Quick Installation & Usage

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/web-audio-decibel-meter.git

## Quick Usage Example

```typescript
import { 
  aWeighting, 
  cWeighting, 
  addIncoherentDecibels, 
  soundDistanceDrop 
} from "./src/index";

// 1. Calculate A-weighting curve adjustment at 100 Hz
const weight100Hz = aWeighting(100); 
console.log(weight100Hz); // ~ -19.1 dB (attenuated due to low human ear sensitivity)

// 2. Add two independent sound sources (60 dB conversational chatter)
const total = addIncoherentDecibels([60, 60]);
console.log(total); // 63.01 dB (doubling power = +3 dB)

// 3. Sound level of an 85 dB lawn mower at 10 meters when measured at 20 meters
const levelAt20m = soundDistanceDrop(85, 10, 20);
console.log(levelAt20m); // ~ 78.98 dB (~6 dB drop per distance doubling)
    

Acoustic Reference Benchmarks
Sound Level (dBA)	        Everyday Sound Example	                   NIOSH / OSHA Exposure Standard
30 dBA	                 Whisper, quiet bedroom at night	          WHO recommended bedroom limit
50 dBA	                 Refrigerator hum, moderate rainfall	       Daytime residential guideline (EPA)
60 dBA	                 Normal conversation at 1 meter              Completely safe for prolonged exposure
70 dBA	                 Vacuum cleaner, busy office            	    Annoyance / concentration disruption
85 dBA	                 Heavy traffic, lawn mower, noisy diner	    NIOSH 8-hour maximum safe limit
100 dBA	                 Baby crying up close, motorcycle, subway	 Maximum 15 minutes recommended
120 dBA	                 Police siren, rock concert front row	       Immediate hearing damage threshold
140 dBA	                 Jet engine takeoff, gunshot	                Immediate physical pain threshold
Interactive lookup available at soundleveltest.com/decibel-chart.


Maintained by Nayeem — Software Developer & Acoustics Researcher.

Web: soundleveltest.com/author/nayeem
X / Twitter: @NayeemKar63

Citation
@software{nayeem_web_audio_acoustics,
  author = {Nayeem},
  title = {Web Audio Decibel & Acoustics Toolkit},
  url = {https://soundleveltest.com},
  year = {2026}
}







