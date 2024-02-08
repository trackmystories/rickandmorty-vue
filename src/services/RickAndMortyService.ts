// src/services/RickAndMortyService.ts

import axios from 'axios'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

interface Character {
  id: number
  name: string
  // Add more properties as needed
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
    return response.data // Now returns the full response including info and results
  }
}
