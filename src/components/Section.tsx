import type { ReactNode } from 'react'

// A titled page section with a rule under the heading
function Section({ title, subtitle, children }: { title: string, subtitle?: string, children: ReactNode }) {
  return (
    <section className="mb-12">
      <header className="mb-5 border-b-2 border-black/15 pb-2">
        <h2 className="!mb-0 text-3xl">{title}</h2>
        {subtitle && <p className="m-0 mt-1 text-black/60">{subtitle}</p>}
      </header>
      {children}
    </section>
  )
}

export default Section
