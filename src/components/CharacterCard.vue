<template>
  <div class="card" @click="navigateToCharacterView(character.id)">
    <img :src="character.image" :alt="character.name" class="card-img" />
    <div class="card-body">
      <h5 class="card-title">{{ character.name }}</h5>
      <p class="card-text">Status: {{ character.status }}</p>
      <p class="card-text">Species: {{ character.species }}</p>
      <button @click.stop="toggleFavorite(character.id)" class="favorite-btn">
        <span v-if="isFavorite(character.id)" class="heart-filled">❤️</span>
        <span v-else class="heart-empty">🤍</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
}

export default defineComponent({
  props: {
    character: {
      type: Object as PropType<Character>,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const favorites = ref<{ [key: number]: boolean }>({})

    watchEffect(() => {
      const storedFavorites = localStorage.getItem('favorites')
      favorites.value = storedFavorites ? JSON.parse(storedFavorites) : {}
    })

    const toggleFavorite = (id: number) => {
      const newFavorites = { ...favorites.value }
      if (newFavorites[id]) {
        delete newFavorites[id]
      } else {
        newFavorites[id] = true
      }
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      favorites.value = newFavorites
    }

    const isFavorite = (id: number) => {
      return !!favorites.value[id]
    }

    function navigateToCharacterView(id: number) {
      router.push({ name: 'character', params: { id: id.toString() } })
    }

    return { navigateToCharacterView, toggleFavorite, isFavorite }
  }
})
</script>

<style>
.card {
  position: relative;
}
.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
