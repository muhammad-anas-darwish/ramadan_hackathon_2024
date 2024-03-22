<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
      <Navbar />

      <RouterLink to="/">About</RouterLink>
  <RouterView />
</template>

<style scoped>
</style>
