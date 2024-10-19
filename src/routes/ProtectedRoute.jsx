import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export default function ProtectedRoute({ redirectPath }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}
