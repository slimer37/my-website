import asepriteLogo from '../assets/logos/aseprite.svg'
import twitchLogo from '../assets/logos/twitch.svg'
import westernDigitalLogo from '../assets/logos/westerndigital.svg'
import Section from '../components/Section'

// A die-cut sticker outline: each drop-shadow runs on the previous result, so stacking small
// white offsets in every direction grows a solid border that follows the logo's own shape.
const STICKER_OUTLINE_PX = 2.5
const stickerFilter = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]
  .map(([x, y]) => `drop-shadow(${x * STICKER_OUTLINE_PX}px ${y * STICKER_OUTLINE_PX}px 0 white)`)
  .join(' ') + ' drop-shadow(1px 2px 3px rgb(0 0 0 / 0.35))'

type Sticker = {
  logo: string
  label: string
  className: string // position on the card's edge
  rotate: number // degrees; deliberately a little off-kilter
}

type Project = {
  title: string
  blurb: string
  tags: string[]
  href?: string
  linkLabel?: string
  sticker?: Sticker
}

const projects: Project[] = [
  {
    title: "Advanced Image Analysis Platform",
    blurb: "Built for Western Digital as a client. A desktop GUI for Meta's Segment Anything Model that generates, edits, and measures image segmentation masks.",
    tags: ['Python', 'Qt', 'Flask', 'SAM'],
    href: "https://github.com/slimer37/CSE120-G310-WD-AIA",
    linkLabel: "View on GitHub",
    sticker: { logo: westernDigitalLogo, label: "Western Digital", className: "right-1 bottom-10", rotate: -4 },
  },
  {
    title: "Video Share Site",
    blurb: "A Zoom clone with social media features, made for my CSE 108 class. Supports screen-sharing, chat, friends lists, and accounts.",
    tags: ['Web', 'Video', 'Chat', 'Accounts'],
    href: "https://github.com/slimer37/108-video-share-site",
    linkLabel: "View on GitHub",
  },
  {
    title: "TabletopPDA",
    blurb: "A computer vision app that uses tracking markers to identify a marked deck and advise Blackjack moves for practice.",
    tags: ['Computer Vision', 'Fiducial Markers'],
    href: "https://github.com/slimer37/TabletopPDA",
    linkLabel: "View on GitHub",
  },
  {
    title: "Games Change Minds Lab - Tobacco Education",
    blurb: "A grant-funded project for which I was the sole Unity developer, as part of a psychology research group at UC Merced. I added multiplayer to an existing Unity 3D first-person game, along with numerous puzzle features.",
    tags: ['Unity', 'C#', 'Multiplayer'],
  },
  {
    title: "Git Extension for Aseprite",
    blurb: "An Aseprite extension for viewing a sprite's git history. Pick a commit from the File menu and the sprite opens in a new tab as it was at that commit.",
    tags: ['Lua', 'Aseprite', 'Git'],
    href: "https://github.com/slimer37/aseprite-git-extension",
    linkLabel: "View on GitHub",
    sticker: { logo: asepriteLogo, label: "Aseprite", className: "-left-3 bottom-15", rotate: -11 },
  },
  {
    title: "FoxBotPy",
    blurb: "A simple, customizable Twitch bot with a desktop GUI.",
    tags: ['Python', 'Twitch', 'GUI'],
    href: "https://github.com/slimer37/FoxBotPy",
    linkLabel: "View on GitHub",
    sticker: { logo: twitchLogo, label: "Twitch", className: "right-20 -top-1", rotate: -6 },
  },
  {
    title: "CoreInsite Rebrand",
    blurb: "A rebrand of MyNextStage, built with React, Tailwind, and Next.js.",
    tags: ['React', 'Tailwind', 'Next.js'],
  },
]

function Projects() {
  document.title = "Projects"

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-2">
      <div className="mb-10">
        <h1 className="!mb-2 font-display text-5xl">Projects</h1>
        <p className="m-0 max-w-2xl text-lg leading-relaxed text-black/70">
          Software projects from coursework and client work.
        </p>
      </div>

      <Section title="Software Projects">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
          {projects.map(p => (
            <article key={p.title} className="relative flex flex-col gap-3 rounded-xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
              {p.sticker && (
                <img
                  src={p.sticker.logo}
                  alt={p.sticker.label}
                  title={p.sticker.label}
                  className={`absolute ${p.sticker.className} h-10 w-10`}
                  style={{ transform: `rotate(${p.sticker.rotate}deg)`, filter: stickerFilter }}
                />
              )}
              <h3 className="m-0 text-xl font-bold">{p.title}</h3>
              <p className="m-0 leading-relaxed text-black/75">{p.blurb}</p>
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                {p.tags.map(t => (
                  <li key={t} className="rounded-full bg-sec-bg px-2.5 py-0.5 font-mono text-xs font-semibold text-secondary-dark">{t}</li>
                ))}
              </ul>
              {p.href && (
                <a href={p.href} target="_blank" rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 font-mono text-sm font-bold no-underline hover:underline">
                  {p.linkLabel}<span className="material-symbols-outlined">arrow_right_alt</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </Section>
    </div>
  )
}

export default Projects
