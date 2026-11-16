import { motion } from 'motion/react'

import ccLogo from '../assets/portfolio/thumbs/cclogo.png'
import ccThumb from '../assets/portfolio/thumbs/ccthumb.png'
import emBackground from '../assets/portfolio/thumbs/embackground.png'
import titleTile from '../assets/portfolio/thumbs/titletile.png'
import mobBoss from '../assets/portfolio/gallery/mobboss.png'
import { ProjectTile, VideoTile } from '../components/ProjectTile'

import './portfolio.css'

const videoIds: string[] = [
  "XOmTZZrjrbM",
  "4XTsVQlmsRc",
  "E6ze2qa9GYc",
  "41PoCimG538",
]

function Portfolio() {
  document.title = "Portfolio"

  return (
    <div className="m-1 flex flex-col">
      <h2>Prototypes</h2>
      <div className="flex max-h-[500px] justify-evenly gap-4 overflow-x-auto p-3">
        {videoIds.map(id => <VideoTile key={id} videoId={id} />)}
      </div>
      <h2>Projects</h2>
      <motion.a
        href="https://slimer37.itch.io"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 inline-flex items-center justify-center gap-1.5 rounded-sm border-[3px] border-black
                   bg-bg px-6 py-3 font-mono text-xl font-bold text-black no-underline hover:bg-[#dbdbdb]"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        Games on itch.io
        <span className="material-symbols-outlined">arrow_right_alt</span>
      </motion.a>
      <div className="flex max-h-[500px] justify-evenly gap-4 overflow-x-auto p-3">
        <ProjectTile
          href="https://slimer37.itch.io/gtmk-jam-2021"
          bg={emBackground}
          overlay={
            <div className="duppet-container">
              <div className="duppet pixel-art"></div>
            </div>
          }
        >
          GMTK 2021 Entry
          <img className="m-auto w-[90%] pixel-art drop-shadow-lg" src={titleTile} />
        </ProjectTile>
        <ProjectTile to="/gallery" bg={mobBoss}>
          3D Gallery
        </ProjectTile>
        <ProjectTile href="https://slimer37.itch.io/early-store-game" bg={ccThumb} className="max-h-[400px] max-w-[50vw]">
          Counter Chaos (Legacy)
          <img className="m-auto h-[90%] drop-shadow-lg" src={ccLogo} />
        </ProjectTile>
      </div>
    </div>
  )
}

export default Portfolio
