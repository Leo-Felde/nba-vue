import apiClient from './index'
import { Player } from '../types/player'

export interface PlayersParams {
  cursor?: number | null
  per_page?: number
  search?: string
}

interface listResponse {
  data: Player[]
  meta: any
}

export const fetchPlayers = async (
  params?: PlayersParams
): Promise<listResponse> => {
  try {
    const response = await apiClient.get('/players', { params })
    return response.data
  } catch (error) {
    console.error('Erro ao listar jogadores', error)
    throw error
  }
}

export const getPlayer = async (id: number): Promise<Player> => {
  try {
    const response = await apiClient.get(`/players/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar o jogador de id ${id}:`, error)
    throw error
  }
}
