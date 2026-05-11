import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const api = axios.create({ baseURL: `${API_URL}/api` })

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getPortfolio = () => api.get('/portfolio')
export const login = (email: string, password: string) => api.post('/auth/login', { email, password })
export const verifyToken = () => api.post('/auth/verify')
export const changePassword = (currentPassword: string, newPassword: string) =>
  api.post('/auth/change-password', { currentPassword, newPassword })

// Personal
export const updatePersonal = (data: any) => api.put('/admin/personal', data)

// Skills
export const addSkill = (data: any) => api.post('/admin/skills', data)
export const updateSkill = (id: string, data: any) => api.put(`/admin/skills/${id}`, data)
export const deleteSkill = (id: string) => api.delete(`/admin/skills/${id}`)

// Projects
export const addProject = (data: any) => api.post('/admin/projects', data)
export const updateProject = (id: string, data: any) => api.put(`/admin/projects/${id}`, data)
export const deleteProject = (id: string) => api.delete(`/admin/projects/${id}`)

// Experience
export const addExperience = (data: any) => api.post('/admin/experience', data)
export const updateExperience = (id: string, data: any) => api.put(`/admin/experience/${id}`, data)
export const deleteExperience = (id: string) => api.delete(`/admin/experience/${id}`)

// Achievements
export const addAchievement = (data: any) => api.post('/admin/achievements', data)
export const updateAchievement = (id: string, data: any) => api.put(`/admin/achievements/${id}`, data)
export const deleteAchievement = (id: string) => api.delete(`/admin/achievements/${id}`)

// Feedback
export const addFeedback = (data: any) => api.post('/admin/feedback', data)
export const updateFeedback = (id: string, data: any) => api.put(`/admin/feedback/${id}`, data)
export const deleteFeedback = (id: string) => api.delete(`/admin/feedback/${id}`)

// Section Visibility
export const updateVisibility = (data: any) => api.put('/admin/visibility', data)

// Custom Sections
export const addSection = (data: any) => api.post('/admin/sections', data)
export const updateSection = (id: string, data: any) => api.put(`/admin/sections/${id}`, data)
export const deleteSection = (id: string) => api.delete(`/admin/sections/${id}`)

// Messages
export const getMessages = () => api.get('/admin/messages')
export const markRead = (id: string) => api.put(`/admin/messages/${id}/read`)
export const deleteMessage = (id: string) => api.delete(`/admin/messages/${id}`)

// Contact
export const sendMessage = (data: { name: string; email: string; message: string }) =>
  api.post('/contact', data)

// Image Upload helpers
export const uploadProjectImage = (file: File) => {
  const fd = new FormData(); fd.append('image', file)
  return api.post('/upload/project', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export const uploadExperienceLogo = (file: File) => {
  const fd = new FormData(); fd.append('image', file)
  return api.post('/upload/experience', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export const uploadAchievementImage = (file: File) => {
  const fd = new FormData(); fd.append('image', file)
  return api.post('/upload/achievement', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export const uploadFeedbackAvatar = (file: File) => {
  const fd = new FormData(); fd.append('image', file)
  return api.post('/upload/feedback', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export const uploadAvatar = (file: File) => {
  const fd = new FormData(); fd.append('image', file)
  return api.post('/upload/avatar', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export const deleteUpload = (path: string) => api.delete('/upload', { data: { path } })

export const getImageUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${API_URL}${path}`
}

export default api
