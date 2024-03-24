<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const countries = ref([
	{'id': '1', 'name' : '1sdf'},
	{'id': '2', 'name' : '2asdf'},
	{'id': '3', 'name' : 'sadf3'},
]);
const submit = (id) => {
	axios
    .get("/countries")
    .then((res) => {
      countries.value = res["data"];
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  axios
    .get("/countries")
    .then((res) => {
      // countries.value = res["data"];
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <article>
    <div class="relative overflow-x-auto md:mx-5">
      <table class="w-full text-sm text-left text-gray-400">
        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Country name</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="country in countries" :key="country.id" class="border-b bg-gray-800 border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">{{ country.name }}</th>
            <td class="px-6 py-4">
					    <form @submit.prevent="submit(country.id)" class="max-w-sm mx-auto">
								<button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-700 hover:bg-red-800 focus:ring-red-900">Delete</button>
							</form>
						</td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>
