<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>

  <div class="bg-blue-500 text-white p-4">
    <h1 class="text-2xl font-bold">Hello, Tailwind CSS with Vue.js!</h1>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
