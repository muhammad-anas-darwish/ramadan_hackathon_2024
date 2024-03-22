<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar />

  <!-- <RouterLink to="/">About</RouterLink> -->
    
  <RouterView />

  <Footer />
</template>

<style scoped>
</style>
