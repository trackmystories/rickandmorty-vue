<template>
  <div class="search-container">
    <input
      v-model="searchTerm"
      @input="emitSearchTerm"
      type="text"
      placeholder="Search by name..."
      class="search-input"
    />
    <button @click="emitSearchTerm" class="search-button">Search</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(_, { emit }) {
    const searchTerm = ref('')

    const emitSearchTerm = () => {
      emit('search', searchTerm.value)
    }

    return { searchTerm, emitSearchTerm }
  }
})
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 40px;
}

.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  outline: none;
  min-width: 240px;
}

.search-input:focus {
  border-color: #007bff;
}

.search-button {
  padding: 10px 20px;
  border: none;
  border-radius: 0 4px 4px 0;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.search-button:hover {
  background-color: #0056b3;
}

.search-button:active {
  transform: scale(0.98);
}
</style>
