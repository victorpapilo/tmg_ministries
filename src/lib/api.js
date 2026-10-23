import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tmg_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getError = (error) => error?.response?.data?.message || error?.message || 'Something went wrong.'
