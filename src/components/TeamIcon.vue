<template>
  <img :src="teamImageUrl" :alt="`Logo ${icon}`" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
}>()

const teamImageUrl = computed(() => {
  return new URL(`../assets/logos/${props.icon}.svg`, import.meta.url).href
})
</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
}
</style>
