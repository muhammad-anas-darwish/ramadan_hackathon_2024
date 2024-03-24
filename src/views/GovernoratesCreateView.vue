<script setup>
import { ref } from "vue";
import axios from "axios";

const name = ref("");

const submit = () => {
	axios
		.post("/governorates/create", {
			name: name.value,
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
  <article>
    <form @submit.prevent="submit" class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium text-white">Governorate name</label>
        <input v-model="name" type="text" id="name" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" required />
      </div>
      <button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Create</button>
    </form>
  </article>
</template>
