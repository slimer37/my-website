import { useId } from 'react'
import { useReducedMotion } from 'motion/react'
import Wave from './Wave'
import { heroWaveLayers } from '../data/waveLayers'
import type { WaveLayer } from '../data/waveLayers'

export default function Waves({ layers = heroWaveLayers }: { layers?: WaveLayer[] }) {
  const id = useId().replace(/:/g, '')
  const reducedMotion = useReducedMotion()

  return <>
    {layers.map((layer, i) => {
      const gradientId = `wave-gradient-${id}-${i}`
      return (
        <Wave key={i} fill={`url(#${gradientId})`}
          paused={!!reducedMotion}
          height={layer.height}
          baseline={layer.baseline}
          harmonics={layer.harmonics}
        >
          <defs>
            <linearGradient id={gradientId} gradientTransform="rotate(90)">
              <stop offset="10%" stopColor={layer.stops[0]} />
              <stop offset={`${layer.fadeEnd}%`} stopColor={layer.stops[1]} />
            </linearGradient>
          </defs>
        </Wave>
      )
    })}
  </>
}

