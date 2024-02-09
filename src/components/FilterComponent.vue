<template>
  <div class="filters">
    <select v-model="filters.status" class="filter-select">
      <option value="">Status</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
    <input v-model="filters.species" placeholder="Species" class="filter-input" />
    <input v-model="filters.type" placeholder="Type" class="filter-input" />
    <select v-model="filters.gender" class="filter-select">
      <option value="">Gender</option>
      <option value="female">Female</option>
      <option value="male">Male</option>
      <option value="genderless">Genderless</option>
      <option value="unknown">Unknown</option>
    </select>
    <button @click="applyFilters" class="apply-button">Apply Filters</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(_, { emit }) {
    const filters = ref({
      status: '',
      species: '',
      type: '',
      gender: ''
    })

    function applyFilters() {
      emit('filter', filters.value)
    }

    return { filters, applyFilters }
  }
})
</script>
<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-input,
.filter-select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  min-width: 140px;
  box-sizing: border-box;
}

.filter-input:focus,
.filter-select:focus {
  border-color: #007bff;
}

.apply-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.apply-button:hover {
  background-color: #0056b3;
}

.apply-button:active {
  transform: scale(0.98);
}

@media (max-width: 600px) {
  .filters {
    flex-direction: column;
    align-items: center;
  }
}
</style>
