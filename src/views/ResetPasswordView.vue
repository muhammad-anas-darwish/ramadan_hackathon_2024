<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute, RouterLink } from "vue-router";
import router from '@/router/index.js';

const route = useRoute();

const password = ref("");

const errors = ref(0);

const submit = () => {
  axios
    .post(`https://ajirnicom-production.up.railway.app/auth/reset-pass/${route.params.id}`, {
      newPassword: password.value,
    })
    .then((res) => {
      router.push({ name: 'Login'});
    })
    .catch((error) => {
      let message = error.response["data"]["message"];
      errors.value = message;

      if (typeof message === "string") {
        errors.value = [message];
      }
    });
};
</script>

<template>
  <article>
    <form @submit.prevent="submit" class="max-w-sm mx-auto">
      <div v-show="errors" class="p-4 mb-4 text-sm rounded-lg bg-gray-700 text-red-400">
        <span v-for="error in errors" :key="error">* {{ error }}.</span><br />
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-white">تعيين كلمة سر جديدة</label>
        <input v-model="password" type="password" id="password" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" required />
      </div>
      <button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">إعادة تعيين</button>
    </form>
  </article>
</template>

<style></style>
