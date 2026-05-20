import { apiPost } from './http'

export type Role = 'ADMIN' | 'TECNICO' | 'USUARIO'

export interface LoginResponse {
  token: string
  type: string
  id: number
  username: string
  email: string
  nombre: string
  apellido: string
  role: Role
}

export function login(username: string, password: string): Promise<LoginResponse> {
  return apiPost<LoginResponse>('/auth/login', { username, password })
}
