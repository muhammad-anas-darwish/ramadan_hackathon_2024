<script setup>
import { ref } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";

const email = ref("");

const messages = ref(0);
const errors = ref(0);

const submit = () => {
  axios
    .post("http://localhost:3000/auth/forget-pass", {
      email: email.value,
    })
    .then((res) => {
      messages.value = ["We send email to you."];
      errors.value = 0;
    })
    .catch((error) => {
      let message = error.response['data']['message'];
      errors.value = message;

      if (typeof message === 'string') {
        errors.value = [message];
      }
    });
};
</script>

<template>
  <article>
    <form @submit.prevent="submit" class="max-w-sm mx-auto">
      <div v-show="errors" class="p-4 mb-4 text-sm rounded-lg bg-gray-700 text-red-400">
        <span v-for="error in errors" :key="error">* {{ error }}.</span><br>
      </div>
      <div v-show="messages" class="p-4 mb-4 text-sm rounded-lg bg-gray-700 text-green-400">
        <span v-for="message in messages" :key="message">* {{ message }}</span>
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
        <input v-model="email" type="email" id="email" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" placeholder="name@gmail.com" required />
      </div>
      <div class="mb-5">
        <RouterLink class="ms-2 text-sm font-medium hover:underline text-blue-500" :to="{ name: 'Login' }">Login</RouterLink>
      </div>
      <button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Submit</button>
    </form>
  </article>
</template>

<style></style>
