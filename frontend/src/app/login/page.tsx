'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/api'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem('admin_token')
    if (token) router.push('/admin')
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Fill in all fields'); return }
    setLoading(true)
    try {
      const res = await login(form.email, form.password)
      localStorage.setItem('admin_token', res.data.token)
      toast.success('Welcome back!')
      router.push('/admin')
    } catch { toast.error('Invalid credentials') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className={`w-full max-w-sm transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <a href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-8 transition-opacity hover:opacity-60"
          style={{ color: 'var(--ink-3)' }}>← Back to Portfolio</a>
        <div className="rounded-2xl border p-8" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl font-black text-sm flex items-center justify-center text-white mx-auto mb-4"
              style={{ background: 'var(--ink)' }}>NP</div>
            <h1 className="font-black text-xl mb-1" style={{ color: 'var(--ink)' }}>Admin Access</h1>
            <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--ink-3)' }}>Portfolio Management</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: 'var(--ink-3)' }}>Email</label>
              <input type="email" className="input-field" placeholder="admin@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: 'var(--ink-3)' }}>Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} className="input-field pr-10" placeholder="••••••••"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: 'var(--ink-3)' }}>
                  {show ? '[show]' : '[hide]'}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full text-center disabled:opacity-50">
              {loading ? 'Authenticating...' : 'Enter Dashboard →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
