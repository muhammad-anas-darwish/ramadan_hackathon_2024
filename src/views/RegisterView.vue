<script setup>
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const username = ref("");
const password = ref("");
const repeatPassword = ref("");

const submit = () => {
  axios
    .post("/register", {
      email: email.value,
      username: username.value,
      password: password.value,
      repeatPassword: repeatPassword.value,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <section class="bg-gray-800 px-4 lg:px-0 py-16">
    <article>
      <form @submit.prevent="submit" class="max-w-sm mx-auto">
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
          <input v-model="email" type="email" id="email" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" placeholder="name@gmail.com" required />
        </div>
        <div class="mb-5">
          <label for="username" class="block mb-2 text-sm font-medium text-white">Username</label>
          <input v-model="username" type="text" id="username" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" placeholder="name" required />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
          <input v-model="password" type="password" id="password" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" required />
        </div>
        <div class="mb-5">
          <label for="repeat-password" class="block mb-2 text-sm font-medium text-white">Repeat password</label>
          <input v-model="repeatPassword" type="password" id="repeat-password" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" required />
        </div>
        <div class="mb-5">
          <RouterLink class="ms-2 text-sm font-medium hover:underline text-blue-500" :to="{ name: 'Login' }">
            I already have an account
          </RouterLink>
        </div>
        <button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Register</button>
      </form>
    </article>
  </section>
</template>

<style></style>
