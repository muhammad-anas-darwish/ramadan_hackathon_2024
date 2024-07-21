<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";
import { checkCookie } from '../router/authGuard.js';


const cardsData = ref([]);
const isLoading = ref(false);

// load tools data
onMounted(() => {
  // isLoading.value = true;
  axios
    .get("https://ajirnicom-production.up.railway.app/user/tool", {
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": checkCookie('Authorization'),
      }
      }
    )
    .then((res) => {
      cardsData.value = res.data;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <div v-if="isLoading" class="backdrop-filter backdrop-blur-md fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
  </div>
  <article v-else>
    <h1 class="text-gray-200 text-3xl mx-auto w-fit font-medium mb-6">أدواتي</h1>

    <!-- Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 p-3 w-full">
      <div v-for="card in cardsData" :key="card.id" class="w-full border rounded-lg shadow bg-gray-800 border-gray-700">
        <img class="p-4 rounded-t-lg" :src="`https://ajirnicom-production.up.railway.app/tool/image/${card.image}`" alt="صورة المنتج" />
        <div class="px-5 pb-5">
          <RouterLink class="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent" :to="{ name: 'Tool',  params: { id: card.id } }"> 
            <h5 class="text-xl font-semibold tracking-tight text-gray-200">
              {{ card.title }}
            </h5>
          </RouterLink>
          <div class="mt-2.5 mb-2.5 break-words text-xl text-gray-400">{{ card.usedQuantity  }}/{{ card.baseQuantity}} القطع المستخدمة</div>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>
