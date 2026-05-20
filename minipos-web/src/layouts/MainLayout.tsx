import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function MainLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Tickets</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user?.nombre} {user?.apellido}
            <span className="ml-2 px-2 py-0.5 text-xs rounded bg-gray-200 capitalize">
              {user?.role.toLowerCase()}
            </span>
          </span>
          <button
            onClick={logout}
            className="text-sm px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
