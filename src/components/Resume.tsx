import { education, experience, skills } from '../data/resume'
import type { Role, SkillGroup } from '../data/resume'
import Section from './Section'

const cardClass = 'box-border rounded-xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-sm'
const gridClass = 'grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5'

function RoleCard({ org, title, start, end, bullets }: Role) {
  const current = end === 'Present'
  return (
    <article className={`${cardClass} flex flex-col gap-3`}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <h4 className="m-0 text-lg font-bold">{org}</h4>
          {title && <p className="m-0 font-mono text-sm font-semibold text-secondary-dark">{title}</p>}
        </div>
        <p className={`m-0 flex items-center gap-1.5 font-mono text-sm ${current ? 'font-semibold text-secondary-dark' : 'text-black/60'}`}>
          {current && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />}
          {start} – {end}
        </p>
      </header>
      <ul className="m-0 list-none space-y-1.5 p-0">
        {bullets.map(b => (
          <li key={b} className="relative pl-4 leading-snug text-black/80
                                 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5
                                 before:rounded-full before:bg-secondary before:content-['']">
            {b}
          </li>
        ))}
      </ul>
    </article>
  )
}

function Chip({ children, outlined }: { children: string, outlined?: boolean }) {
  return (
    <li className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${
      outlined
        ? 'border border-secondary/50 text-secondary-dark'
        : 'bg-sec-bg text-secondary-dark'
    }`}>
      {children}
    </li>
  )
}

function SkillRow({ label, items, level }: SkillGroup) {
  return (
    <div className="grid gap-2 sm:grid-cols-[13rem_1fr] sm:items-baseline sm:gap-4">
      <h4 className="m-0 font-bold">{label}</h4>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {items.map(i => <Chip key={i} outlined={level === 'intermediate'}>{i}</Chip>)}
      </ul>
    </div>
  )
}

function Resume() {
  const { degree, certificate } = education

  return (
    <>
      <Section title="Experience">
        <h3 className="mb-3 mt-0 font-mono text-sm font-bold uppercase tracking-wider text-black/55">Most relevant</h3>
        <div className={`${gridClass} mb-8`}>
          {experience.relevant.map(r => <RoleCard key={r.org} {...r} />)}
        </div>
        <h3 className="mb-3 mt-0 font-mono text-sm font-bold uppercase tracking-wider text-black/55">Work history</h3>
        <div className={gridClass}>
          {experience.work.map(r => <RoleCard key={r.org} {...r} />)}
        </div>
      </Section>

      <Section title="Education">
        <div className={gridClass}>
          <article className={`${cardClass} flex flex-col gap-3`}>
            <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div>
                <h4 className="m-0 text-lg font-bold">{degree.school}</h4>
                <p className="m-0 font-mono text-sm font-semibold text-secondary-dark">{degree.program}</p>
              </div>
              <p className="m-0 font-mono text-sm text-black/60">{degree.date}</p>
            </header>
            <p className="m-0 text-black/80">{degree.highlights.join(' · ')}</p>
            <div>
              <p className="m-0 mb-2 font-mono text-xs font-bold uppercase tracking-wider text-black/55">Relevant coursework</p>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {degree.coursework.map(c => <Chip key={c}>{c}</Chip>)}
              </ul>
            </div>
          </article>

          <article className={`${cardClass} flex flex-col gap-1 self-start`}>
            <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h4 className="m-0 text-lg font-bold">{certificate.name}</h4>
              <p className="m-0 font-mono text-sm text-black/60">{certificate.date}</p>
            </header>
            <p className="m-0 text-black/80">{certificate.detail}</p>
          </article>
        </div>
      </Section>

      <Section title="Technical Skills">
        <div className={`${cardClass} flex flex-col gap-5`}>
          {skills.map(s => <SkillRow key={s.label} {...s} />)}
        </div>
      </Section>
    </>
  )
}

export default Resume
