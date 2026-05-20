import { apiGet } from './http'

export interface CategoryResponse {
  id: number
  nombre: string
  descripcion: string
  createdAt: string
}

export function getCategories(): Promise<CategoryResponse[]> {
  return apiGet<CategoryResponse[]>('/categorias')
}