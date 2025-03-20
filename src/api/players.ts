import apiClient from './index'

export interface PlayersParams {
  cursor?: number
  per_page?: number
  search?: string
}

export const fetchPlayers = async (params?: PlayersParams) => {
  try {
    const response = await apiClient.get('/players', { params })
    return response.data
  } catch (error) {
    console.error('Erro ao listar jogadores', error)
    throw error
  }
}

export const getPlayer = async (id: number) => {
  try {
    const response = await apiClient.get(`/players/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar o jogador de id ${id}:`, error)
    throw error
  }
}
