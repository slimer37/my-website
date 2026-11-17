import type { ReactNode } from 'react'

// A titled page section with a rule under the heading
function Section({ title, subtitle, action, children }: { title: string, subtitle?: string, action?: ReactNode, children: ReactNode }) {
  return (
    <section className="mb-12">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b-2 border-black/15 pb-2">
        <div>
          <h2 className="!mb-0 text-3xl">{title}</h2>
          {subtitle && <p className="m-0 mt-1 text-black/60">{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}

export default Section
