<script setup>
import { ref } from "vue";
import axios from "axios";

// Filter popup Fields
const name = ref("");
const place = ref("");
const minPrice = ref("");
const maxPrice = ref("");

const cardsData = ref([]);


// Filter popup
const showFilterPopup = ref(false);
const toggleFilterPopup = () => {
  showFilterPopup.value = !showFilterPopup.value;
}

const submitFilter = () => {
  axios
    .get("https://httpbin.org/get", { params: {
      name: name.value,
      place: place.value,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value,
    }})
    .then((res) => {
      cardsData.value = res['data'];
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <section class="bg-gray-800 px-4 lg:px-0 py-10">
    <article>
      <h1 class="text-gray-200 text-3xl mx-auto w-fit font-medium mb-6">Tools</h1>

      <!-- Toggle filter popup -->
      <div class="w-full flex justify-end pr-8 mb-4">
        <button @click="toggleFilterPopup" class="block focus:ring-4 focus:outline-none rounded-full p-2.5 text-center bg-gray-400 hover:bg-gray-500 focus:ring-gray-600" type="button">
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
              <h3 class="text-xl font-semibold text-white">Filter</h3>
              <button @click="toggleFilterPopup" type="button" class="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>
            <div class="p-4 md:p-5 space-y-4">
              <form @submit.prevent="submitFilter" class="max-w-sm mx-auto">
                <div class="mb-5">
                  <label for="name" class="block mb-2 text-sm font-medium text-white">Name</label>
                  <input v-model="name" type="text" id="name" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" />
                </div>
                <div class="mb-5">
                  <label for="place" class="block mb-2 text-sm font-medium text-white">Place</label>
                  <input v-model="place" type="text" id="place" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" />
                </div>
                <div class="mb-5">
                  <label for="min-price" class="block mb-2 text-sm font-medium text-white">Price</label>
                  <div class="flex justify-between gap-4">
                    <input v-model="minPrice" type="number" id="min-place" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" min="0" placeholder="Min Price" />
                    <input v-model="maxPrice" type="number" id="max-price" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" min="0" placeholder="Max Price" />
                  </div>
                </div>

                <button @click="toggleFilterPopup" type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Filter</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 p-3 w-full">
        <div class="w-full border rounded-lg shadow bg-gray-800 border-gray-700">
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
        </div>
      </div>
    </article>
  </section>
</template>

<style></style>
