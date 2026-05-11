'use client'
import { useEffect, useRef, useState } from 'react'
import { getImageUrl } from '@/lib/api'

const TYPE_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  education:     { bg: 'var(--accent-lt)', color: 'var(--accent)',  label: 'Education' },
  work:          { bg: 'var(--green-lt)',  color: 'var(--green)',   label: 'Work' },
  certification: { bg: 'var(--gold-lt)',   color: 'var(--gold)',    label: 'Certification' },
}

export default function ExperienceSection({ experience }: { experience?: any[] }) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])



  const data = (experience?.length ? experience : [])
    .slice().sort((a: any, b: any) => parseInt(b.startDate) - parseInt(a.startDate))

  return (
    <section id="experience" ref={ref} className="section-block alt">
      <div className="section-wrap">

        <div className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="edit-label"><span>Experience</span></div>
          <h2 className="edit-title">Path &amp; <em>Progress</em></h2>
        </div>

        <div className="relative max-w-3xl mx-auto">

          {data.map((item: any, i: number) => {
            const ts = TYPE_STYLE[item.type] || TYPE_STYLE.education
            const logoUrl = getImageUrl(item.logo || '')
            const isLast = i === data.length - 1

            return (
              <div key={i} className="relative flex gap-0 mb-0">

                <div className="flex flex-col items-center" style={{ width: '80px', flexShrink: 0 }}>
                  <div className="text-right w-full pr-7 mb-1">
                    <span className="text-xs font-black font-mono" style={{ color: 'var(--ink-3)' }}>
                      {item.startDate}
                    </span>
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 font-black text-sm"
                    style={{ background: ts.bg, borderColor: ts.color, color: ts.color, flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  {!isLast && (
                    <div className="flex-1 w-0.5 mt-1" style={{ minHeight: '60px', background: `linear-gradient(to bottom, ${ts.color}, var(--border))` }} />
                  )}
                </div>

                <div className={`flex-1 ml-4 mb-10 card card-hover transition-all duration-700 overflow-hidden ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}>

                  <div className="h-1 w-full" style={{ background: ts.color }} />

                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center font-black text-sm"
                        style={{ background: ts.bg, color: ts.color, border: `1px solid ${ts.color}40` }}>
                        {logoUrl
                          ? <img src={logoUrl} alt={item.organization} className="w-full h-full object-contain p-1" />
                          : item.organization.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-lg leading-tight mb-0.5" style={{ color: 'var(--ink)' }}>
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm" style={{ color: 'var(--ink-2)' }}>
                            {item.organization}
                          </span>
                          {item.location && (
                            <>
                              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--border-2)' }} />
                              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--ink-3)' }}>
                                {item.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider mb-1"
                          style={{ background: ts.bg, color: ts.color }}>
                          {ts.label}
                        </span>
                        <p className="text-[10px] font-mono block" style={{ color: 'var(--ink-3)' }}>
                          {item.startDate} → {item.current ? 'Present' : item.endDate}
                        </p>
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--ink-3)' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          <div className="flex items-center gap-4 pl-[80px] ml-0">
            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg"
              style={{ borderColor: 'var(--border)', color: 'var(--ink-3)' }}>
              ✦
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: 'var(--ink-3)' }}>
              Continuous Growth
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
