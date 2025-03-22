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

//// ENDPOINTS MOCK
export const createPlayer = async (
  player: Player
): Promise<{ status: number; data: Player }> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2500))
    return { status: 201, data: player }
  } catch (error) {
    console.error('Erro ao criar o jogador', error)
    throw error
  }
}

export const updatePlayer = async (
  player: Player
): Promise<{ status: number; data: Player }> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2500))
    return { status: 200, data: player }
  } catch (error) {
    console.error(`Erro ao editar o jogador de id ${player.id}:`, error)
    throw error
  }
}

export const deletePlayer = async (
  id: number
): Promise<{ status: number; message: string }> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2500))
    return { status: 204, message: 'Jogador excluído com sucesso' }
  } catch (error) {
    console.error(`Erro ao excluir o jogador de id ${id}:`, error)
    throw error
  }
}
