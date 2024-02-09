import { defineStore } from 'pinia'

interface FavoritesState {
  favorites: Record<number, boolean>
}

export const useFavoritesStore = defineStore({
  id: 'favorites',
  state: (): FavoritesState => ({
    favorites: {}
  }),
  actions: {
    toggleFavorite(characterId: number) {
      if (this.favorites[characterId]) {
        delete this.favorites[characterId]
      } else {
        this.favorites[characterId] = true
      }
    },
    isFavorite(characterId: number): boolean {
      return !!this.favorites[characterId]
    }
  }
})
