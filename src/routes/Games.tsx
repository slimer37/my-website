import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import ccLogo from '../assets/portfolio/thumbs/cclogo.png'
import ccThumb from '../assets/portfolio/thumbs/ccthumb.png'
import emBackground from '../assets/portfolio/thumbs/embackground.png'
import titleTile from '../assets/portfolio/thumbs/titletile.png'
import { ProjectTile } from '../components/ProjectTile'
import Section from '../components/Section'

import './portfolio.css'

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
      {tags.map(t => (
        <li key={t} className="rounded-full bg-sec-bg px-2.5 py-0.5 font-mono text-xs font-semibold text-secondary-dark">
          {t}
        </li>
      ))}
    </ul>
  )
}

type CardProps = {
  title: string
  blurb: string
  tags: string[]
  href: string
  linkLabel: string
  tile: ReactNode
}

function GameCard({ title, blurb, tags, href, linkLabel, tile }: CardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white/70 shadow-sm backdrop-blur-sm">
      <div className="p-2 pb-0">{tile}</div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="m-0 text-xl font-bold">{title}</h3>
        <p className="m-0 leading-relaxed text-black/75">{blurb}</p>
        <Tags tags={tags} />
        <a href={href} target="_blank" rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1 font-mono text-sm font-bold no-underline hover:underline">
          {linkLabel}<span className="material-symbols-outlined">arrow_right_alt</span>
        </a>
      </div>
    </article>
  )
}

function Games() {
  document.title = "Games"

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-2">
      <div className="mb-10">
        <h1 className="!mb-2 font-display text-5xl">Games</h1>
        <p className="m-0 max-w-2xl text-lg leading-relaxed text-black/70">
          Jam entries and releases, mostly built in Unity. Everything playable is on itch.io.
        </p>
        <motion.a
          href="https://slimer37.itch.io"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-secondary px-5 py-2.5 font-mono
                     text-base font-bold !text-white no-underline shadow-sm transition-colors hover:bg-secondary-dark"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Browse all games on itch.io
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </motion.a>
      </div>

      <Section title="Featured Games">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
          <GameCard
            href="https://slimer37.itch.io/gtmk-jam-2021"
            title="GMTK Game Jam 2021 Entry"
            blurb="A game jam entry built from scratch in a weekend, with hand-drawn pixel art and animated characters."
            tags={['Unity', 'Game Jam', 'Pixel Art']}
            linkLabel="Play on itch.io"
            tile={
              <ProjectTile
                fill
                href="https://slimer37.itch.io/gtmk-jam-2021"
                bg={emBackground}
                overlay={
                  <div className="duppet-container">
                    <div className="duppet pixel-art"></div>
                  </div>
                }
              >
                <img className="m-auto w-[90%] pixel-art drop-shadow-lg" src={titleTile} alt="" />
              </ProjectTile>
            }
          />
          <GameCard
            href="https://slimer37.itch.io/early-store-game"
            title="Counter Chaos (Legacy)"
            blurb="An early version of a store-management game, kept online as a record of where the project started."
            tags={['Unity', 'C#', 'Legacy']}
            linkLabel="View on itch.io"
            tile={
              <ProjectTile fill href="https://slimer37.itch.io/early-store-game" bg={ccThumb}>
                <img className="m-auto h-[90%] drop-shadow-lg" src={ccLogo} alt="" />
              </ProjectTile>
            }
          />
        </div>
      </Section>
    </div>
  )
}

export default Games
