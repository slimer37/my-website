import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const MotionLink = motion.create(Link)

const GROW_PX = 6

const slotClass =
  'relative isolate flex min-h-[300px] min-w-[25vw] grow flex-col p-5 font-mono text-xl text-white no-underline'

const backdropClass = 'absolute -z-10 rounded-lg bg-secondary bg-cover bg-center shadow-md'

const backdropVariants = {
  rest: { top: 0, right: 0, bottom: 0, left: 0 },
  hover: { top: -GROW_PX, right: -GROW_PX, bottom: -GROW_PX, left: -GROW_PX },
}

const videoClass =
  'relative flex min-h-[300px] min-w-[25vw] grow flex-col overflow-hidden rounded-lg ' +
  'bg-secondary p-5 shadow-md'

const spring = { type: 'spring', stiffness: 300, damping: 20 } as const

type TileProps = {
  bg?: string
  className?: string
  overlay?: ReactNode // drawn above the content, clipped to the (growing) tile bounds
  children: ReactNode
} & ({ href: string; to?: never } | { to: string; href?: never })

// Content stays in normal flow, so the tile is sized by it. Only the backdrop grows
// outward by a fixed number of pixels, so the background re-fits (cover) without stretching.
export function ProjectTile({ bg, className = '', overlay, children, href, to }: TileProps) {
  const content = (
    <>
      <motion.div
        className={backdropClass}
        style={bg ? { backgroundImage: `url(${bg})` } : undefined}
        variants={backdropVariants}
        transition={spring}
      />
      {children}
      {overlay && (
        <motion.div
          className="pointer-events-none absolute overflow-hidden rounded-lg"
          variants={backdropVariants}
          transition={spring}
        >
          {overlay}
        </motion.div>
      )}
    </>
  )

  const props = {
    className: `${slotClass} ${className}`,
    initial: 'rest',
    whileHover: 'hover',
  }

  return to
    ? <MotionLink to={to} {...props}>{content}</MotionLink>
    : <motion.a href={href} {...props}>{content}</motion.a>
}

export function VideoTile({ videoId }: { videoId: string }) {
  return (
    <span className={videoClass}>
      <iframe
        className="h-full w-full"
        src={'https://www.youtube.com/embed/' + videoId}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </span>
  )
}
