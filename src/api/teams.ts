import apiClient from './index'
import { Team } from '../types/team'

interface listResponse {
  data: Team[]
  meta: any
}

export const fetchTeams = async (): Promise<listResponse> => {
  try {
    const response = await apiClient.get('/teams')
    return response.data
  } catch (error) {
    console.error('Erro ao listar os times', error)
    throw error
  }
}
