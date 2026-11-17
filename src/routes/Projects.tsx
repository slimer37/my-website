import Section from '../components/Section'

type Project = {
  title: string
  blurb: string
  tags: string[]
  href?: string
  linkLabel?: string
}

const projects: Project[] = [
  {
    title: "Advanced Image Analysis Platform",
    blurb: "Built for Western Digital as a client. A desktop GUI for Meta's Segment Anything Model (SAM) that generates, edits, and measures image segmentation masks. Mask generation and upscaling run on a Flask server, and the Qt client adds guided annotation, filtering, and measurement tools.",
    tags: ['Python', 'Qt', 'Flask', 'SAM'],
    href: "https://github.com/slimer37/CSE120-G310-WD-AIA",
    linkLabel: "View on GitHub",
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
            <article key={p.title} className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
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
