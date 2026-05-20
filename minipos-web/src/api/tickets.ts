import { apiGet, apiPost } from './http'

export type TicketStatus = 'ABIERTO' | 'EN_PROCESO' | 'PENDIENTE' | 'RESUELTO' | 'CERRADO'
export type Priority = 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA'

export interface TicketResponse {
  id: number
  titulo: string
  descripcion: string
  status: TicketStatus
  prioridad: Priority
  categoriaId: number | null
  categoriaNombre: string | null
  creadoPorId: number
  creadoPorUsername: string
  asignadoAId: number | null
  asignadoAUsername: string | null
  asignadoANombreCompleto: string | null
  createdAt: string
  updatedAt: string
  closedAt: string | null
}

export interface CreateTicketRequest {
  titulo: string
  descripcion: string
  prioridad: Priority
  categoriaId: number
}

export function getTickets(): Promise<TicketResponse[]> {
  return apiGet<TicketResponse[]>('/tickets')
}

export function createTicket(data: CreateTicketRequest): Promise<TicketResponse> {
  return apiPost<TicketResponse>('/tickets', data)
}