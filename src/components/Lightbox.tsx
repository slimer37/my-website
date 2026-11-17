import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export type LightboxItem =
  | { url: string, kind: 'image' | 'video' }
  | { url: string, kind: 'youtube', videoId: string } // url is the watch page, used as the identity

type LightboxProps = {
  item: LightboxItem | null
  onClose: () => void
}

// A floating pane over a darkened backdrop. Closes with the corner X, a click on the backdrop, or Escape.
export function Lightbox({ item, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!item) return

    const opener = document.activeElement as HTMLElement | null
    const root = document.documentElement
    const previousOverflow = root.style.overflow

    root.style.overflow = 'hidden' // the scrollbar gutter is reserved, so nothing shifts
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      root.style.overflow = previousOverflow
      opener?.focus()
    }
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
          className="fixed inset-0 z-[20000] box-border flex items-center justify-center bg-black/80 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute left-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center border-0
                       bg-transparent p-0 text-white opacity-80 transition-opacity hover:opacity-100"
          >
            <span className="material-symbols-outlined !text-4xl">close</span>
          </button>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={e => e.stopPropagation()}
          >
            <Media key={item.url} item={item} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Keeps the media (and the box around it) invisible until it has loaded, with a spinner on the backdrop meanwhile.
function Media({ item }: { item: LightboxItem }) {
  const [ready, setReady] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Cached media can finish loading before React's load handlers are attached
  useEffect(() => {
    const image = imageRef.current
    const video = videoRef.current
    if ((image?.complete && image.naturalWidth > 0) || (video && video.readyState >= 2)) setReady(true)
  }, [])

  const mediaClass = `block max-h-[85vh] max-w-[calc(100vw-3rem)] rounded-lg shadow-2xl transition-opacity duration-200 ${ready ? 'opacity-100' : 'opacity-0'}`
  const done = () => setReady(true) // also on error, so a broken file shows the browser's own fallback

  return (
    <>
      {!ready && <Spinner />}
      {item.kind === 'youtube'
        ? <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            onLoad={done}
            className={`${mediaClass} aspect-video w-[min(calc(100vw-3rem),calc(85vh*16/9))] border-0 bg-black`} />
        : item.kind === 'image'
        ? <img ref={imageRef} src={item.url} alt="" onLoad={done} onError={done} className={`${mediaClass} bg-[#2f3640]`} />
        : <video ref={videoRef} src={item.url} controls autoPlay loop playsInline onLoadedData={done} onError={done}
            className={`${mediaClass} bg-black`} />}
    </>
  )
}

function Spinner() {
  return (
    <div role="status" aria-label="Loading" className="pointer-events-none absolute left-1/2 top-1/2 -ml-6 -mt-6">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
    </div>
  )
}
