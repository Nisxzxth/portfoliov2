'use client'
import { useEffect, useRef, useState } from 'react'


const ICON_CLASS: Record<string, string> = {
  nextjs: 'devicon-nextjs-plain', express: 'devicon-express-original',
  mongodb: 'devicon-mongodb-plain', tailwindcss: 'devicon-tailwindcss-plain',
}
function iconClass(slug: string): string {
  if (ICON_CLASS[slug]) return ICON_CLASS[slug]
  return `devicon-${slug}-plain`
}

function profLabel(level: number): { label: string; color: string } {
  if (level >= 90) return { label: 'Expert', color: '#059669' }
  if (level >= 75) return { label: 'Advanced', color: 'var(--accent)' }
  if (level >= 55) return { label: 'Proficient', color: 'var(--gold)' }
  return { label: 'Learning', color: 'var(--ink-3)' }
}

export default function SkillsSection({ skills }: { skills?: any[] }) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])


  const data: any[] = skills?.length ? skills : []
  const sorted = [...data].sort((a, b) => (b.level || 0) - (a.level || 0))

  const top3 = sorted.slice(0, 3)
  const rest = sorted.slice(3)

  return (
    <section id="skills" ref={ref} className="section-block alt">
      <div className="section-wrap">

        <div className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="edit-label"><span>Technical</span></div>
          <h2 className="edit-title">Skills &amp; <em>Expertise</em></h2>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {top3.map((skill, i) => {
            const { label, color } = profLabel(skill.level)
            return (
              <div key={i} className="card card-hover p-7 text-center relative overflow-hidden cursor-default"
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-[20px]"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${skill.color}18 0%, transparent 70%)`,
                    opacity: hovered === i ? 1 : 0 }} />
                <div className="text-5xl mb-3 transition-transform duration-300"
                  style={{ transform: hovered === i ? 'scale(1.15)' : 'scale(1)' }}>
                  <i className={iconClass(skill.icon)} style={{ color: skill.color }} />
                </div>
                <div className="font-black text-base mb-1" style={{ color: 'var(--ink)' }}>{skill.name}</div>
                <div className="w-full h-1.5 rounded-full mb-2" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: inView ? `${skill.level}%` : '0%', background: skill.color,
                      transitionDelay: `${i * 200 + 400}ms` }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: `${skill.color}18`, color }}>
                    {label}
                  </span>
                  <span className="text-xs font-black font-mono" style={{ color: 'var(--ink-3)' }}>{skill.level}%</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className={`card p-6 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-5" style={{ color: 'var(--ink-3)' }}>
            Full Toolset
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {rest.map((skill, i) => {
              const idx = i + 3
              return (
                <div key={i}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl cursor-default transition-all duration-200 group"
                  style={{ background: 'var(--bg)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${skill.color}12`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
                  <i className={`${iconClass(skill.icon)} text-3xl`} style={{ color: skill.color }} />
                  <span className="text-[10px] font-bold text-center leading-tight" style={{ color: 'var(--ink-2)' }}>
                    {skill.name}
                  </span>
                  <div className="w-full h-0.5 rounded-full" style={{ background: 'var(--border)' }}>
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: inView ? `${skill.level}%` : '0%', background: skill.color,
                        transitionDelay: `${idx * 60 + 600}ms` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
