<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();

const password = ref("");

const submit = () => {
  axios
    .get(`/reset-password/${route.params.id}`, {
      password: password.value,
    })
    .then((res) => {
      location.replace("/login");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <article>
    <form @submit.prevent="submit" class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-white">Set new password</label>
        <input v-model="password" type="password" id="password" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" required />
      </div>
      <button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Reset password</button>
    </form>
  </article>
</template>

<style></style>
