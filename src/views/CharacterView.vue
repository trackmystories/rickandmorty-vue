<template>
  <div class="character-view" v-if="character">
    <img :src="character.image" :alt="character.name" class="character-image" />
    <h1>{{ character.name }}</h1>
    <p>Status: {{ character.status }}</p>
    <p>Species: {{ character.species }}</p>
    <p>Type: {{ character.type }}</p>
    <p>Gender: {{ character.gender }}</p>
    <p>Created: {{ character.created }}</p>
  </div>
  <div v-else>Loading character details...</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import RickAndMortyService from '../services/RickAndMortyService'

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

export default defineComponent({
  setup() {
    const route = useRoute()
    const character = ref<Character | null>(null)

    onMounted(async () => {
      const characterId = route.params.id
      if (characterId) {
        try {
          character.value = await RickAndMortyService.getCharacterById(
            Array.isArray(characterId) ? characterId[0] : characterId
          )
        } catch (error) {
          console.error('Failed to fetch character:', error)
        }
      }
    })

    return { character }
  }
})
</script>

<style>
.character-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
}

.character-image {
  width: 100%;
  max-width: 400px;
}
</style>
