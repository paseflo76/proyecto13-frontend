import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Loader from './Loader'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth()

  if (loading) return <Loader />

  if (!user) return <Navigate to="/login" replace />

  if (requireAdmin && !isAdmin()) return <Navigate to="/" replace />

  return children
}

export default ProtectedRoute
