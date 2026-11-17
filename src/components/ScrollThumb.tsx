import { useCallback, useEffect, useRef, useState } from 'react'
import './ScrollThumb.css'

const MIN_THUMB_PX = 40

// A stand-in for the page's native scrollbar. The native one reserves a solid gutter that page
// content (waves, paint streaks) can't paint into; this floats over the page instead, so the
// area under the handle stays transparent. It's only shown on desktop-style pointers (see the CSS),
// where the native bar is hidden; touch devices keep their own overlay scrollbars.
function ScrollThumb() {
  const thumbRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const drag = useRef({ startY: 0, startScroll: 0 })

  const update = useCallback(() => {
    const thumb = thumbRef.current
    if (!thumb) return
    const root = document.documentElement
    const view = root.clientHeight
    const max = root.scrollHeight - view

    if (max <= 1) {
      thumb.style.display = 'none'
      return
    }

    const height = Math.max(MIN_THUMB_PX, (view / root.scrollHeight) * view)
    thumb.style.display = ''
    thumb.style.height = `${height}px`
    thumb.style.transform = `translateY(${(root.scrollTop / max) * (view - height)}px)`
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    // Route changes and images loading change the page height without any scroll or resize
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    observer.observe(document.documentElement)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [update])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { startY: e.clientY, startScroll: document.documentElement.scrollTop }
    setDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    const root = document.documentElement
    const view = root.clientHeight
    const thumbHeight = thumbRef.current!.offsetHeight
    const ratio = (root.scrollHeight - view) / (view - thumbHeight)
    root.scrollTop = drag.current.startScroll + (e.clientY - drag.current.startY) * ratio
  }

  return (
    <div
      ref={thumbRef}
      aria-hidden="true"
      className={'scroll-thumb' + (dragging ? ' dragging' : '')}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    />
  )
}

export default ScrollThumb
