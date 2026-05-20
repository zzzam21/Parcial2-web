import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { Role } from '../api/auth'

interface PrivateRouteProps {
  children: React.ReactNode
  allowedRoles?: Role[]
}

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Acceso denegado</h1>
          <p className="text-gray-600 mt-2">No tienes permisos para ver esta página.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
