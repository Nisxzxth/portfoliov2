'use client'
import { useEffect, useState } from 'react'
export default function LoadingScreen() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setP(prev => { if (prev >= 100) { clearInterval(t); return 100 } return prev + Math.random() * 18 }), 90)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="w-12 h-12 rounded-2xl font-black text-sm flex items-center justify-center text-white mb-8" style={{ background: 'var(--ink)' }}>NP</div>
      <div className="w-40 h-px relative overflow-hidden" style={{ background: 'var(--border)' }}>
        <div className="absolute inset-y-0 left-0 transition-all duration-200" style={{ width: `${Math.min(p, 100)}%`, background: 'var(--ink)' }} />
      </div>
      <p className="mt-4 text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: 'var(--ink-3)' }}>Loading</p>
    </div>
  )
}
