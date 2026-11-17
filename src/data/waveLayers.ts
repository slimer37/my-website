import type { Harmonic } from '../components/Wave'

export type WaveLayer = {
  height: string // CSS height of the layer's box, anchored to the bottom of the container
  baseline: number
  harmonics: Harmonic[]
  stops: [string, string]
  fadeEnd: number
}

export const heroWaveLayers: WaveLayer[] = [
  {
    height: '60%',
    baseline: 130,
    harmonics: [
      { amplitude: 30, wavelength: 900, speed: 0.3, phase: 0 },
      { amplitude: 18, wavelength: 450, speed: -0.45, phase: 1.3 },
      { amplitude: 9, wavelength: 230, speed: 0.7, phase: 2.1 },
    ],
    stops: ['#ffffffc4', '#ffffff00'],
    fadeEnd: 50,
  },
  {
    height: '40%',
    baseline: 95,
    harmonics: [
      { amplitude: 20, wavelength: 700, speed: -0.55, phase: 0.7 },
      { amplitude: 11, wavelength: 340, speed: 0.8, phase: 2.4 },
      { amplitude: 6, wavelength: 170, speed: -1.0, phase: 4.0 },
    ],
    stops: ['#ffffff80', '#ffffff00'],
    fadeEnd: 100,
  },
]

// The same pair of waves as the hero, raised so the top surface sits about 80% of a screen above
// the container's bottom edge. Heights are the hero's (as vh) plus the same lift, so the two layers
// keep exactly the spacing they have on the home page.
const LOWER_LIFT = 'calc(20vh + 130px)'
export const lowerWavesHeight = `calc(100vh + ${LOWER_LIFT})`
export const lowerWaveLayers: WaveLayer[] = heroWaveLayers.map(layer => ({
  ...layer,
  height: `calc(${parseFloat(layer.height)}vh + ${LOWER_LIFT})`,
}))
