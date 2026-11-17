import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import './gallery.css'

type TileProps = {
  file: string,
  inner: ReactNode
}

function ArtTile({ file, inner }: TileProps) {
  const url = "gallery/" + file

  return <a href={url} className="art-tile" style={{ backgroundImage: `url(${url})` }}>
    {inner}
  </a>
}

type VideoTileProps = TileProps & {
  controls?: boolean
}

// Autoplaying videos only play while on screen, so the page isn't decoding all of them at once.
function VideoTile({ file, inner, controls = false }: VideoTileProps) {
  const url = "gallery/" + file
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || controls) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => { })
      else video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [controls])

  return <a href={url} className="art-tile">
    <video ref={videoRef} src={url} controls={controls} loop muted playsInline preload="metadata" />
    <div className="over-video">{inner}</div>
  </a>
}

function Gallery() {
  document.title = "Art"

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-2">
      <div className="mb-10">
        <h1 className="!mb-2 font-display text-5xl">Art</h1>
        <p className="m-0 max-w-2xl text-lg leading-relaxed text-black/70">
          3D models, renders and animations. Click any tile to view the original.
        </p>
      </div>
      <div className="gallery-grid">
        <VideoTile file="mobboss.mp4" inner={<>Pokemon Mafia</>} />
        <ArtTile file="boxcutter.jpg" inner={<><q>Boxcutter</q>&nbsp;Boss</>} />
        <ArtTile file="gramophone.png" inner={<>Gramophone</>} />
        <VideoTile file="spacerotate.mp4" inner={<>Personality Cores</>} />
        <ArtTile file="venom.png" inner={<>Venom</>} />
        <ArtTile file="room.jpg" inner={<>Bedroom Replica</>} />
        <VideoTile file="burgerlooped.mp4" inner={<>Burger Place</>} />
        <ArtTile file="skullresult.jpg" inner={<>Low-Poly T-Rex Skull</>} />
        <ArtTile file="gladosdone.jpg" inner={<>GLaDOS</>} />
        <ArtTile file="bigdipper.jpg" inner={<>Big Dipper</>} />
        <ArtTile file="opensign.png" inner={<>Open Sign</>} />
        <VideoTile file="motiontrack.mp4" inner={<>VFX Test</>} />
        <VideoTile file="factorio.mp4" inner={<>Factorio Inserters</>} />
        <VideoTile file="firelegwalk.mp4" inner={<>Fireleg (Click to play)</>} controls />
        <ArtTile file="buildingnight.png" inner={<>City Corner Building</>} />
        <ArtTile file="funky.jpg" inner={<q>Funky Abstract</q>} />
        <VideoTile file="ship.mp4" inner={<>Ship</>} />
        <ArtTile file="lemon.png" inner={<q>Combustible Lemon</q>} />
      </div>
    </div>
  )
}

export default Gallery
