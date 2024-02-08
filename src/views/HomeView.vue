<template>
  <div>
    <h1>Rick and Morty Characters</h1>
    <ul>
      <li v-for="character in characters" :key="character.id">
        {{ character.name }}
      </li>
    </ul>
    <button @click="loadMoreCharacters" v-if="nextPage">Load More</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import RickAndMortyService from '../services/RickAndMortyService'
import { Character } from '../services/RickAndMortyService'

export default defineComponent({
  setup() {
    const characters = ref<Character[]>([])
    const currentPage = ref(1)
    const nextPage = ref(true) // Tracks whether there is a next page to load

    const loadCharacters = async (page: number) => {
      try {
        const response = await RickAndMortyService.getCharacters(page)
        characters.value = [...characters.value, ...response.results]
        nextPage.value = !!response.info.next // Update based on whether there's a next page
      } catch (error) {
        console.error(error)
      }
    }

    const loadMoreCharacters = () => {
      currentPage.value++
      loadCharacters(currentPage.value)
    }

    loadCharacters(currentPage.value) // Initial load

    return { characters, loadMoreCharacters, nextPage }
  }
})
</script>
