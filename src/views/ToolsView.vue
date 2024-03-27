<script setup>
import { ref, onMounted } from "vue";

import axios from "axios";

// Filter popup Fields
const name = ref("");
const place = ref("");
const minPrice = ref("");
const maxPrice = ref("");

const cardsData = ref([]);
const isLoading = ref(false);

// Filter popup
const showFilterPopup = ref(false);
const toggleFilterPopup = () => {
  showFilterPopup.value = !showFilterPopup.value;
};
const submitFilter = () => {
  axios
    .get("https://httpbin.org/get", {
      params: {
        name: name.value,
        place: place.value,
        minPrice: minPrice.value,
        maxPrice: maxPrice.value,
      },
    })
    .then((res) => {
      cardsData.value = res["data"];
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

// load tools data
onMounted(() => {
  isLoading.value = true;
  axios
    .get(`https://mocki.io/v1/64b08fdc-50fe-40e9-b8fa-b9115d06f0b6`)
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
    <h1 class="text-gray-200 text-3xl mx-auto w-fit font-medium mb-6">الأدوات</h1>

    <!-- Toggle filter popup -->
    <div class="w-full flex justify-end pl-8 mb-4">
      <button class="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-gray-300 bg-gray-500 hover:bg-gray-600 focus:ring-gray-700 ml-4">
        <RouterLink :to="{ name: 'Tools.Create' }"> إضافة أداة جديدة </RouterLink>
      </button>
      <button @click="toggleFilterPopup" class="block focus:ring-4 focus:outline-none rounded-full p-2.5 text-center bg-gray-500 hover:bg-gray-600 focus:ring-gray-700" type="button">
        <svg class="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </button>
    </div>

    <!-- Filter popup -->
    <div v-show="showFilterPopup" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative rounded-lg shadow bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
            <h3 class="text-xl font-semibold text-white">تصفية</h3>
            <button @click="toggleFilterPopup" type="button" class="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          <div class="p-4 md:p-5 space-y-4">
            <form @submit.prevent="submitFilter" class="max-w-sm mx-auto">
              <div class="mb-5">
                <label for="name" class="block mb-2 text-sm font-medium text-white">اسم الأداة</label>
                <input v-model="name" type="text" id="name" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" />
              </div>
              <div class="mb-5">
                <label for="place" class="block mb-2 text-sm font-medium text-white">العنوان</label>
                <input v-model="place" type="text" id="place" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" />
              </div>
              <div class="mb-5">
                <label for="min-price" class="block mb-2 text-sm font-medium text-white">السعر</label>
                <div class="flex justify-between gap-4">
                  <input v-model="minPrice" type="number" id="min-place" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" min="0" placeholder="الحد الأدنى" />
                  <input v-model="maxPrice" type="number" id="max-price" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" min="0" placeholder="الحد الأعلى" />
                </div>
              </div>

              <button @click="toggleFilterPopup" type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">تصفية</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 p-3 w-full">
      <div v-for="card in cardsData" :key="card.id" class="w-full border rounded-lg shadow bg-gray-800 border-gray-700">
        <a href="#">
          <!-- <img class="p-4 rounded-t-lg" :src="card.image ?? '@/assets/images/hat.jpg'" alt="product image" /> -->
          <img class="p-4 rounded-t-lg" src="@/assets/hat.jpg" alt="product image" />
        </a>
        <div class="px-5 pb-5">
          <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-200">{{ card.title }}</h5>
          </a>
          <div class="mt-2.5 mb-2.5 break-words text-xl text-gray-400">{{ card.user.username }}</div>
          <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-white">{{ card.price }}$</span>
            <a href="#" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">استعارة</a>
          </div>
        </div>
      </div>
      <!-- <div class="w-full border rounded-lg shadow bg-gray-800 border-gray-700">
            <a href="#">
              <img class="p-4 rounded-t-lg" src="../images/1.jpg" alt="product image" />
            </a>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-200">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
              </a>
              <div class="mt-2.5 mb-2.5 break-words text-xl text-gray-400">Anas Darwish</div>
              <div class="mt-2.5 mb-5 text-xl text-gray-200">5 Days</div>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-white">$599</span>
                <a href="#" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Add to cart</a>
              </div>
            </div>
          </div> -->
    </div>
  </article>
</template>

<style></style>
