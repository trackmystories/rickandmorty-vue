<template>
  <header>
    <nav>
      <RouterLink to="/" active-class="active-link">Home</RouterLink>
      <RouterLink to="/favorites" active-class="active-link">Favorites</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
header {
  background-color: black;
  padding: 1rem 0;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #ccc;
}

nav a.active-link {
  color: green !important;
  font-weight: bold;
}
</style>
