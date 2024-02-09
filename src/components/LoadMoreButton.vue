<template>
  <button v-if="isVisible" @click="emitClick" class="load-more-button">Load More</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['load-more'],
  methods: {
    emitClick() {
      this.$emit('load-more')
    }
  }
})
</script>

<style scoped>
.load-more-button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
}
</style>
