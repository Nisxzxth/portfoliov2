'use client'
export default function Footer({ personal }: { personal?: any }) {
  return (
    <footer className="border-t py-10" style={{ borderColor: 'var(--border)' }}>
      <div className="section-wrap flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center text-white" style={{ background: 'var(--ink)' }}>NP</div>
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--ink-3)' }}>
            © {new Date().getFullYear()} Nishanthan Perumal
          </span>
        </div>
        <div className="flex items-center gap-6">
          {[['GitHub', personal?.github || '#'], ['LinkedIn', personal?.linkedin || '#'], ['Email', `mailto:${personal?.email || ''}`]].map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noopener noreferrer"
              className="text-[10px] font-black uppercase tracking-widest transition-colors hover:opacity-60" style={{ color: 'var(--ink-3)' }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
