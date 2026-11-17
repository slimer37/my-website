import { VideoTile } from '../components/ProjectTile'
import Section from '../components/Section'

const prototypes = [
  { id: "XOmTZZrjrbM", title: "3D Spider Animation Test" },
  { id: "4XTsVQlmsRc", title: "2D Platformer Swinging" },
  { id: "E6ze2qa9GYc", title: "2D Top-Down Hyphae Controlled Mushroom" },
  { id: "41PoCimG538", title: "3D Swinging Mushroom" },
]

function Projects() {
  document.title = "Projects"

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-2">
      <div className="mb-10">
        <h1 className="!mb-2 font-display text-5xl">Projects</h1>
        <p className="m-0 max-w-2xl text-lg leading-relaxed text-black/70">
          Prototypes and experiments: gameplay mechanics and animation tests.
        </p>
      </div>

      <Section title="Prototypes" subtitle="Short videos of mechanics and animation tests">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
          {prototypes.map(v => <VideoTile key={v.id} videoId={v.id} title={v.title} />)}
        </div>
      </Section>
    </div>
  )
}

export default Projects
