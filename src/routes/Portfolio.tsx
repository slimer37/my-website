import { Link } from 'react-router-dom'

import ccLogo from '../assets/portfolio/thumbs/cclogo.png'
import titleTile from '../assets/portfolio/thumbs/titletile.png'

import './portfolio.css'

function EmbedVideo(videoId: string){
  return <iframe width="100%" height="100%"
    src={"https://www.youtube.com/embed/" + videoId + "?controls=0"}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen></iframe>
}

function Portfolio() {
  document.title = "Portfolio"

  const videoIds: string[] = [
    "XOmTZZrjrbM",
    "4XTsVQlmsRc",
    "E6ze2qa9GYc",
    "41PoCimG538",
  ];

  return (
    <>
      <div className="portfolio">
        <h2>Prototypes</h2>
        <div className="row">
          {videoIds.map(id => <span className="project-tile wip-tile">{EmbedVideo(id)}</span>)}
        </div>
        <h2>Projects</h2>
        <div className="row">
          <a href="https://slimer37.itch.io/gtmk-jam-2021" className="project-tile emayhem-project-tile">
            GMTK 2021 Entry
            <img className="em-title pixel-art shadow" src={titleTile} />
            <div className="duppet-container">
              <div className="duppet pixel-art"></div>
            </div>
          </a>
          <Link to="/gallery" className="project-tile gallery-tile">
            3D Gallery
          </Link>
          <a href="https://slimer37.itch.io/early-store-game" className="project-tile cc-tile">
            Counter Chaos (Legacy)
            <img className="cc-title shadow" src={ccLogo} />
          </a>
        </div>
      </div>
    </>
  )
}

export default Portfolio;