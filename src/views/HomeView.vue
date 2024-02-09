<template>
  <div id="home-view">
    <SearchComponent @search="handleSearch" />
    <FilterComponent @filter="fetchCharacters" />
    <h1>Rick and Morty Characters</h1>
    <div class="characters-grid">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>
    <LoadMoreButton :isVisible="nextPage" @load-more="loadMoreCharacters" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import CharacterCard from '../components/CharacterCard.vue'
import SearchComponent from '../components/SearchComponent.vue'
import FilterComponent from '../components/FilterComponent.vue'
import LoadMoreButton from '../components/LoadMoreButton.vue'
import { useCharactersStore } from '../stores/charactersStore'

const store = useCharactersStore()

onMounted(() => {
  store.loadCharacters()
})

const handleSearch = (name: string) => {
  store.searchCharacters(name)
}

const loadMoreCharacters = () => {
  store.loadMoreCharacters()
}

const fetchCharacters = (filters) => {
  store.fetchCharactersWithFilters(filters)
}

const characters = computed(() => store.characters)
const nextPage = computed(() => store.nextPage)
</script>

<style scoped>
#home-view {
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
