import { defineStore } from 'pinia'
import RickAndMortyService from '../services/RickAndMortyService'

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    currentPage: 1,
    nextPage: true,
    favorites: new Set<number>()
  }),
  actions: {
    async loadCharacters() {
      try {
        const response = await RickAndMortyService.getCharacters(this.currentPage)
        this.characters.push(...response.results)
        this.nextPage = !!response.info.next
      } catch (error) {
        console.error('Failed to load characters:', error)
      }
    },
    async searchCharacters(name: string) {
      this.currentPage = 1
      const response = await RickAndMortyService.getCharactersByName(name, this.currentPage)
      this.characters = response.results
      this.nextPage = !!response.info.next
    },
    async loadMoreCharacters() {
      this.currentPage++
      await this.loadCharacters()
    },
    async fetchCharactersWithFilters(filters: Record<string, any>) {
      const query = new URLSearchParams(filters).toString()
      const response = await RickAndMortyService.getCharactersWithFilters(query)
      this.characters = response.results
      this.nextPage = !!response.info.next
    },
    toggleFavorite(characterId: number) {
      if (this.favorites.has(characterId)) {
        this.favorites.delete(characterId)
      } else {
        this.favorites.add(characterId)
      }
    },
    isFavorite(characterId: number): boolean {
      return this.favorites.has(characterId)
    }
  }
})
