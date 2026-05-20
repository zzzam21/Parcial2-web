import { useEffect, useState } from 'react'
import { getTickets, type TicketResponse } from '../api/tickets'
import { getCategories, type CategoryResponse } from '../api/categories'

const statusColors: Record<string, string> = {
  ABIERTO: 'bg-red-100 text-red-800',
  EN_PROCESO: 'bg-blue-100 text-blue-800',
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  RESUELTO: 'bg-green-100 text-green-800',
  CERRADO: 'bg-gray-100 text-gray-800',
}

const priorityColors: Record<string, string> = {
  BAJA: 'bg-gray-100 text-gray-700',
  MEDIA: 'bg-blue-100 text-blue-800',
  ALTA: 'bg-orange-100 text-orange-800',
  CRITICA: 'bg-red-100 text-red-800',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function TicketCard({ ticket }: { ticket: TicketResponse }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200 flex flex-col gap-2">
      <h3 className="font-semibold text-gray-900 text-base leading-snug">{ticket.titulo}</h3>

      <div className="flex gap-2 flex-wrap">
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[ticket.status] || 'bg-gray-100 text-gray-700'}`}>
          {ticket.status.replace('_', ' ')}
        </span>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityColors[ticket.prioridad] || 'bg-gray-100 text-gray-700'}`}>
          {ticket.prioridad}
        </span>
      </div>

      {ticket.categoriaNombre && (
        <p className="text-sm text-gray-500">
          <span className="font-medium">Categoría:</span> {ticket.categoriaNombre}
        </p>
      )}

      <p className="text-sm text-gray-500">
        <span className="font-medium">Asignado:</span>{' '}
        {ticket.asignadoANombreCompleto || ticket.asignadoAUsername || (
          <span className="text-gray-400 italic">Sin asignar</span>
        )}
      </p>

      <p className="text-sm text-gray-500">
        <span className="font-medium">Creado:</span> {formatDate(ticket.createdAt)}
      </p>
    </div>
  )
}

export default function DashboardPage() {
  const [tickets, setTickets] = useState<TicketResponse[]>([])
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getTickets()
      .then(setTickets)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {})
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500 text-lg">Cargando tickets...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error al cargar tickets: {error}
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No hay tickets disponibles.</p>
      </div>
    )
  }

  const filteredTickets = selectedCategoryId === ''
    ? tickets
    : tickets.filter((t) => t.categoriaId === selectedCategoryId)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="mb-4">
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value === '' ? '' : Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 text-sm bg-white"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  )
}
