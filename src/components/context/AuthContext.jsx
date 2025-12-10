import { createContext, useState, useEffect } from 'react'
import {
  login as loginAPI,
  register as registerAPI,
  validateToken
} from '../../api/UserApi'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Validar token al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await validateToken()
          setUser(response.data.user)
        } catch (error) {
          console.error('Token inválido:', error)
          logout()
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [token])

  const normalizeError = (error) => {
    if (error.response?.data?.errors) {
      return { details: error.response.data.errors }
    }
    if (typeof error.response?.data === 'string') {
      return { details: { general: error.response.data } }
    }
    if (error.response?.data?.message) {
      return { details: { general: error.response.data.message } }
    }
    return { details: { general: 'Error desconocido' } }
  }

  const login = async (credentials) => {
    try {
      const response = await loginAPI(credentials)
      const { user, token } = response.data

      setUser(user)
      setToken(token)
      localStorage.setItem('token', token)

      return { success: true }
    } catch (error) {
      return { success: false, ...normalizeError(error) }
    }
  }

  const register = async (userData) => {
    try {
      const response = await registerAPI(userData)
      const { user, token } = response.data

      setUser(user)
      setToken(token)
      localStorage.setItem('token', token)

      return { success: true }
    } catch (error) {
      return { success: false, ...normalizeError(error) }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  const isAdmin = () => {
    return user?.role === 'admin' || user?.role === 'librarian'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
