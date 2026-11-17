import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const MotionLink = motion.create(Link)

const GROW_PX = 6

const slotClass =
  'relative isolate box-border flex flex-col p-5 font-mono text-xl text-white no-underline'
const standaloneSize = 'min-h-[300px] min-w-[25vw] grow'
const fillSize = 'h-56 w-full'

const backdropClass = 'absolute -z-10 overflow-hidden rounded-lg bg-secondary bg-cover bg-center shadow-md'

const backdropVariants = {
  rest: { top: 0, right: 0, bottom: 0, left: 0 },
  hover: { top: -GROW_PX, right: -GROW_PX, bottom: -GROW_PX, left: -GROW_PX },
}

const spring = { type: 'spring', stiffness: 300, damping: 20 } as const

type TileProps = {
  bg?: string
  className?: string
  fill?: boolean // fill the parent's width at a fixed height instead of the standalone min sizes
  scrim?: boolean // darkens the bottom of the backdrop so light text stays readable
  overlay?: ReactNode // drawn above the content, clipped to the (growing) tile bounds
  children: ReactNode
} & (
  | { href: string; to?: never; openUrl?: never }
  | { to: string; href?: never; openUrl?: never }
  // Behaves like a link but isn't an <a>, so middle-click autoscroll still works over the tile
  | { openUrl: string; href?: never; to?: never }
)

// Content stays in normal flow, so the tile is sized by it. Only the backdrop grows
// outward by a fixed number of pixels, so the background re-fits (cover) without stretching.
export function ProjectTile({ bg, className = '', fill, scrim, overlay, children, href, to, openUrl }: TileProps) {
  const content = (
    <>
      <motion.div
        className={backdropClass}
        style={bg ? { backgroundImage: `url(${bg})` } : undefined}
        variants={backdropVariants}
        transition={spring}
      >
        {scrim && <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />}
      </motion.div>
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
    className: `${slotClass} ${fill ? fillSize : standaloneSize} ${className}`,
    initial: 'rest',
    whileHover: 'hover',
  }

  if (openUrl) {
    const open = () => window.open(openUrl, '_blank', 'noopener,noreferrer')
    return (
      <motion.div
        role="link"
        tabIndex={0}
        {...props}
        className={`${props.className} cursor-pointer`}
        onClick={open}
        onKeyDown={e => { if (e.key === 'Enter') open() }}
      >
        {content}
      </motion.div>
    )
  }

  return to
    ? <MotionLink to={to} {...props}>{content}</MotionLink>
    : <motion.a href={href} {...props}>{content}</motion.a>
}

function PlayBadge() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"
      className="absolute right-3 top-3 h-9 w-9 fill-white drop-shadow-[0_2px_4px_rgb(0_0_0/0.6)]">
      <path d="M6 3.5v17l14-8.5z" />
    </svg>
  )
}

// A thumbnail tile that opens the video on YouTube
export function VideoTile({ videoId, title }: { videoId: string, title: string }) {
  return (
    <ProjectTile
      openUrl={'https://www.youtube.com/watch?v=' + videoId}
      fill
      scrim
      bg={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
    >
      <PlayBadge />
      <span className="mt-auto text-center [text-shadow:0_1px_6px_rgb(0_0_0/0.8)]">
        {title}
        <span className="sr-only"> (opens on YouTube)</span>
      </span>
    </ProjectTile>
  )
}
