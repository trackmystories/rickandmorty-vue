<template>
  <div class="favorites-view">
    <h1>Favorites</h1>
    <div class="characters-grid">
      <CharacterCard
        v-for="character in favoriteCharacters"
        :key="character.id"
        :character="character"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import CharacterCard from '../components/CharacterCard.vue'
import RickAndMortyService from '../services/RickAndMortyService'
import { Character } from '../services/RickAndMortyService'

export default defineComponent({
  components: {
    CharacterCard
  },
  setup() {
    const favoriteCharacters = ref<Character[]>([])

    async function fetchFavoriteCharacters() {
      const favoritesObject = JSON.parse(localStorage.getItem('favorites') || '{}')
      const favoriteIds = Object.keys(favoritesObject).map((id) => Number(id))

      if (favoriteIds.length === 0) {
        console.log('No favorites to fetch.')
        return
      }

      const promises = favoriteIds.map((id) => RickAndMortyService.getCharacterById(id.toString()))
      const characters = await Promise.all(promises)
      favoriteCharacters.value = characters.filter((character) => character !== null)
    }

    onMounted(fetchFavoriteCharacters)

    return { favoriteCharacters }
  }
})
</script>

<style>
.favorites-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.characters-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
