'use client'
import { useEffect, useState } from 'react'
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [clicking, setClicking] = useState(false)
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    let tx = 0, ty = 0, id: number
    const animate = () => {
      tx += (pos.x - tx) * 0.12
      ty += (pos.y - ty) * 0.12
      setTrail({ x: tx, y: ty })
      id = requestAnimationFrame(animate)
    }
    id = requestAnimationFrame(animate)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mousedown', down); window.removeEventListener('mouseup', up); cancelAnimationFrame(id) }
  }, [pos.x, pos.y])
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null
  return (
    <>
      <div className="fixed pointer-events-none z-[10000] rounded-full" style={{ left: pos.x - 4, top: pos.y - 4, width: clicking ? 6 : 8, height: clicking ? 6 : 8, background: 'var(--ink)', transition: 'width 0.1s, height 0.1s' }} />
      <div className="fixed pointer-events-none z-[9999] rounded-full border" style={{ left: trail.x - 16, top: trail.y - 16, width: 32, height: 32, borderColor: 'var(--ink)', opacity: 0.2 }} />
    </>
  )
}
