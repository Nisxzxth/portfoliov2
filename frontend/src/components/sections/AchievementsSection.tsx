'use client'
import { useEffect, useRef, useState } from 'react'
import { getImageUrl } from '@/lib/api'

export default function AchievementsSection({ achievements }: { achievements?: any[] }) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  if (!achievements?.length) return null

  return (
    <section id="achievements" ref={ref} className="section-block">
      <div className="section-wrap">
        <div className={`mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="edit-label"><span>Recognition</span></div>
          <h2 className="edit-title"><em>Achievements</em> &amp; Awards</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach: any, i: number) => {
            const imgUrl = getImageUrl(ach.image || '')
            return (
              <div key={i}
                className={`card card-hover overflow-hidden transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                {/* Image */}
                {imgUrl && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={imgUrl} alt={ach.title} className="w-full h-full object-cover" />
                  </div>
                )}
                {!imgUrl && (
                  <div className="aspect-[16/9] flex items-center justify-center"
                    style={{ background: 'var(--bg-alt)' }}>
                    <span className="text-5xl">🏆</span>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-black text-base mb-1" style={{ color: 'var(--ink)' }}>{ach.title}</h3>
                  <p className="text-sm leading-relaxed font-medium mb-3" style={{ color: 'var(--ink-3)' }}>{ach.description}</p>
                  {ach.date && (
                    <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--ink-3)' }}>
                      {ach.date}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
