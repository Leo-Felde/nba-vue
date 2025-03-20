import apiClient from './index'

export const fetchTeams = async () => {
  try {
    const response = await apiClient.get('/teams')
    return response.data
  } catch (error) {
    console.error('Erro ao listar os times', error)
    throw error
  }
}
