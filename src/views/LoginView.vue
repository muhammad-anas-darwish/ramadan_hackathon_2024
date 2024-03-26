<script setup>
import { ref } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";
import router from '@/router/index.js';

const email = ref("");
const password = ref("");

const errors = ref(0);

const submit = () => {
  axios
    .post("http://localhost:3000/auth/login", {
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      document.cookie = `Authorization=${res.data['accessToken']}`;

      router.push({ name: 'Home'});
    })
    .catch((error) => {
    console.log(error);
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
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-white">البريد الإلكتروني</label>
        <input v-model="email" type="email" id="email" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" placeholder="name@gmail.com" required />
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-white">كلمة المرور</label>
        <input v-model="password" type="password" id="password" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" required />
      </div>
      <div class="mb-5">
        <RouterLink class="ms-2 text-sm font-medium hover:underline text-blue-500" :to="{ name: 'ForgotPassword' }">نسيت كلمة المرور</RouterLink>
      </div>
      <button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">تسجيل دخول</button>
    </form>
  </article>
</template>

<style></style>
