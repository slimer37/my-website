import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export type Harmonic = {
  amplitude: number   // px
  wavelength: number  // px
  speed: number       // radians per second; sign sets direction
  phase: number       // radians
}

type WaveProps = {
  fill: string
  height: string      // CSS height of the wave's box, anchored to the bottom
  baseline: number    // px from the top of the box to the resting surface
  harmonics: Harmonic[]
  paused?: boolean
  children?: ReactNode
}

const STEP = 8

function Wave({ fill, height, baseline, harmonics, paused = false, children }: WaveProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const svg = svgRef.current!
    const path = pathRef.current!

    let width = svg.clientWidth
    let boxHeight = svg.clientHeight
    let elapsed = 0
    let last = performance.now()
    let frame = 0

    const draw = () => {
      let d = ''
      for (let x = 0; x <= width + STEP; x += STEP) {
        let y = baseline
        for (const h of harmonics) {
          y += h.amplitude * Math.sin((2 * Math.PI * x) / h.wavelength + h.speed * elapsed + h.phase)
        }
        d += `${x === 0 ? 'M' : ' L'} ${x} ${y.toFixed(1)}`
      }
      path.setAttribute('d', `${d} L ${width + STEP} ${boxHeight} L 0 ${boxHeight} Z`)
    }

    const tick = (now: number) => {
      elapsed += (now - last) / 1000
      last = now
      draw()
      frame = requestAnimationFrame(tick)
    }

    const observer = new ResizeObserver(() => {
      width = svg.clientWidth
      boxHeight = svg.clientHeight
      draw()
    })
    observer.observe(svg)

    draw()
    if (!paused) frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [baseline, harmonics, paused])

  return (
    <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height }}>
      {children}
      <path ref={pathRef} fill={fill} />
    </svg>
  )
}

export default Wave
