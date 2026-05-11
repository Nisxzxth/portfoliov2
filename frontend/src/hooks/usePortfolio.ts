'use client'
import { useState, useEffect } from 'react'
import { getPortfolio } from '@/lib/api'

export function usePortfolio() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPortfolio()
      .then(res => setData(res.data))
      .catch(() => setError('Failed to load portfolio data'))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { setChecking(false); return }
    import('@/lib/api').then(({ verifyToken }) => {
      verifyToken()
        .then(() => setIsAuthenticated(true))
        .catch(() => { localStorage.removeItem('admin_token'); setIsAuthenticated(false) })
        .finally(() => setChecking(false))
    })
  }, [])

  const logout = () => {
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    window.location.href = '/'
  }

  return { isAuthenticated, checking, logout }
}
