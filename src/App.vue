<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar />

  <section class="flex-grow px-4 lg:px-0 py-16">
    <RouterView />
  </section>

  <Footer />
</template>

<style scoped></style>
