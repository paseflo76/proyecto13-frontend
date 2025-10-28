import api from './axios'

export const register = (userData) => api.post('/users/register', userData)

export const login = (credentials) => api.post('/users/login', credentials)

export const getProfile = () => api.get('/users/me')

export const validateToken = () => api.get('/users/validate')
