'use client'
import { useEffect, useRef, useState } from 'react'
import { getImageUrl } from '@/lib/api'

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} viewBox="0 0 20 20" className="w-3.5 h-3.5"
          fill={i <= n ? 'var(--gold)' : 'var(--border-2)'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

export default function FeedbackSection({ feedback }: { feedback?: any[] }) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  if (!feedback?.length) return null

  return (
    <section id="feedback" ref={ref} className="section-block alt">
      <div className="section-wrap">
        <div className={`mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="edit-label"><span>Testimonials</span></div>
          <h2 className="edit-title">What People <em>Say</em></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedback.map((fb: any, i: number) => {
            const avatarUrl = getImageUrl(fb.avatar || '')
            return (
              <div key={i}
                className={`card card-hover p-6 flex flex-col gap-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>

                {/* Quote mark */}
                <div className="text-4xl font-serif leading-none" style={{ color: 'var(--accent)', opacity: 0.3 }}>"</div>

                <Stars n={fb.rating || 5} />

                <p className="text-sm leading-relaxed font-medium flex-1" style={{ color: 'var(--ink-2)' }}>
                  "{fb.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-black text-sm"
                    style={{ background: 'var(--accent-lt)', color: 'var(--accent)' }}>
                    {avatarUrl
                      ? <img src={avatarUrl} alt={fb.name} className="w-full h-full object-cover" />
                      : (fb.name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-black text-sm leading-tight" style={{ color: 'var(--ink)' }}>{fb.name}</p>
                    <p className="text-xs font-medium" style={{ color: 'var(--ink-3)' }}>
                      {fb.role}{fb.company && ` @ ${fb.company}`}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
