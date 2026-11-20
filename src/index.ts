/**
 * Web Audio Decibel & Acoustics Toolkit
 * Pure TypeScript DSP equations for browser-based sound measurement.
 * Live implementation: https://soundleveltest.com
 *
 * References:
 * - IEC 61672-1:2013: Electroacoustics - Sound level meters - Part 1: Specifications
 * - ISO 9613-2: Acoustics - Attenuation of sound during propagation outdoors
 */

// IEC 61672-1:2013 nominal pole frequencies (Hz)
const f1 = 20.6;
const f2 = 107.7;
const f3 = 737.9;
const f4 = 12194.0;

/**
 * IEC 61672-1:2013 A-weighting relative frequency response in decibels (dB),
 * normalised to 0 dB at 1,000 Hz.
 * Mimics the human ear's sensitivity curve at moderate sound levels (~40 phon).
 */
export function aWeighting(frequencyHz: number): number {
  if (frequencyHz <= 0) return -Infinity;
  const s = frequencyHz * frequencyHz;
  const f4Sq = f4 ** 2;
  const ra = (f4Sq * s * s) / (
    (s + f1 ** 2) *
    Math.sqrt((s + f2 ** 2) * (s + f3 ** 2)) *
    (s + f4Sq)
  );
  return 20 * Math.log10(ra) + 2.0;
}

/**
 * IEC 61672-1:2013 C-weighting relative frequency response in decibels (dB),
 * normalised to 0 dB at 1,000 Hz.
 * Used for peak sound pressure levels and low-frequency bass measurement.
 */
export function cWeighting(frequencyHz: number): number {
  if (frequencyHz <= 0) return -Infinity;
  const s = frequencyHz * frequencyHz;
  const f4Sq = f4 ** 2;
  const rc = (f4Sq * s) / ((s + f1 ** 2) * (s + f4Sq));
  return 20 * Math.log10(rc) + 0.06;
}

/**
 * Logarithmic addition of incoherent (uncorrelated) acoustic sources.
 * Formula: L_total = 10 * log10( Σ 10^(Li / 10) )
 * Example: Two 60 dB sources add up to ~63.0 dB, not 120 dB.
 */
export function addIncoherentDecibels(levels: number[]): number | null {
  const valid = levels.filter((l) => Number.isFinite(l));
  if (valid.length === 0) return null;
  const sumPower = valid.reduce((acc, l) => acc + Math.pow(10, l / 10), 0);
  return 10 * Math.log10(sumPower);
}

/**
 * Inverse square law sound drop-off over distance (free-field spherical propagation).
 * Drop = 20 * log10(d2 / d1) (~6.02 dB per distance doubling).
 */
export function soundDistanceDrop(sourceLevelDb: number, d1: number, d2: number): number {
  if (d1 <= 0 || d2 <= 0) return sourceLevelDb;
  return sourceLevelDb - 20 * Math.log10(d2 / d1);
}

/**
 * Line source attenuation (highways, heavy road traffic).
 * Drop = 10 * log10(d2 / d1) (~3.01 dB per distance doubling).
 */
export function lineSourceDistanceDrop(sourceLevelDb: number, d1: number, d2: number): number {
  if (d1 <= 0 || d2 <= 0) return sourceLevelDb;
  return sourceLevelDb - 10 * Math.log10(d2 / d1);
}
