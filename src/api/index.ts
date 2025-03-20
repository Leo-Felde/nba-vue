import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.balldontlie.io/v1',
  headers: {
    Authorization: `${import.meta.env.VITE_API_KEY}`,
  },
})

export default apiClient
