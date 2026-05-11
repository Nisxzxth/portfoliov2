'use client'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ personal }: { personal?: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const triggerEasterEgg = () => {
    const next = clickCount + 1
    setClickCount(next)
    if (next >= 5) window.location.href = '/login'
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <nav className={`relative flex items-center justify-between transition-all duration-500 px-6 py-3 rounded-2xl ${
          scrolled 
            ? 'bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/40' 
            : 'bg-transparent'
        }`}>
          
          {/* Professional Brand Mark */}
          <div 
            onClick={triggerEasterEgg}
            className="group flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-9 h-9 bg-slate-950 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-[10deg]">
              <span className="text-white font-bold text-sm tracking-tighter">N.</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-slate-900 tracking-tight">Portfolio</span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">©2026</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[13px] font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-all hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}
            
            <div className="w-px h-4 bg-slate-200 mx-4" />

            <a
              href={personal?.resumeUrl || '#'}
              target="_blank"
              className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[13px] font-bold shadow-sm hover:shadow-md hover:bg-slate-800 transition-all active:scale-95"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`h-0.5 w-full bg-slate-900 transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 w-full bg-slate-900 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-slate-900 transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Dropdown */}
      <div className={`absolute top-full left-6 right-6 mt-2 transition-all duration-300 transform origin-top ${
        mobileOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200 p-4 rounded-3xl shadow-2xl flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-4 text-lg font-bold text-slate-900 border-b border-slate-50 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}