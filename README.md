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


