import axios from 'axios'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  image: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  episode: string[]
  url: string
  created: string
}

interface CharactersResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}

export default {
  async getCharacters(page: number = 1): Promise<CharactersResponse> {
    const response = await axios.get<CharactersResponse>(`${API_BASE_URL}/character?page=${page}`)
    return response.data
  },

  async getCharactersByName(name: string): Promise<CharactersResponse> {
    const response = await axios.get<CharactersResponse>(`${API_BASE_URL}/character/?name=${name}`)
    return response.data
  },

  async getCharactersWithFilters(query: string): Promise<CharactersResponse> {
    const response = await axios.get<CharactersResponse>(`${API_BASE_URL}/character/?${query}`)
    return response.data
  },

  async getCharacterById(id: string): Promise<Character | null> {
    try {
      const response = await axios.get<Character>(`https://rickandmortyapi.com/api/character/${id}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error(`Character with ID ${id} not found.`)
        return null
      }
      throw error
    }
  }
}
