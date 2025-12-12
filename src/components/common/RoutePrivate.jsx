import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function RoutePrivate({
  children,
  requireAdmin,
  requireAdminOrLibrarian
}) {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) return <Navigate to='/login' replace />

  if (requireAdmin && user.role !== 'admin') return <Navigate to='/' replace />

  if (requireAdminOrLibrarian && !['admin', 'librarian'].includes(user.role))
    return <Navigate to='/' replace />

  return children
}
