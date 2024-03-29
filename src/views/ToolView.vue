<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, RouterLink } from "vue-router";
import router from "@/router/index.js";
import { checkCookie } from '../router/authGuard.js';

const route = useRoute();

const messages = ref(0);
const errors = ref(0);

const userId = ref(0);
const image = ref('');
const title = ref("");
const price = ref(0);
const baseQuantity = ref("");
const usedQuantity = ref("");
const description = ref("");
const place = ref("");
const period = ref(1);

const submit = () => {
  axios
    .post(`http://localhost:3000/transaction`, {
      'toolId': route.params.id,
      'period': period.value,
      
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": checkCookie("Authorization"),
      },
    })
    .then((res) => {
      errors.value = 0;
      messages.value = ['تم الطلب تأجير المنتج بنجاح.'];
    })
    .catch((error) => {
      messages.value = 0;
      let message = error.response['data']['message'];
      if (typeof message === 'string') {
        errors.value = [message];
      } else {
        errors.value = message.map(msg => msg.split('.')[1]);
      }
      console.log(error);
    });
};

const isLoading = ref(false);
// load tool data
onMounted(() => {
  // isLoading.value = true;
  axios
    .get(`http://localhost:3000/tool/${route.params.id}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": checkCookie('Authorization')
      },
    })
    .then((res) => {
      console.log(res);
      userId.value = res.data["userId"];
      image.value = `http://localhost:3000/tool/image/${res.data["image"]}`;
      title.value = res.data["title"];
      price.value = res.data["price"];
      baseQuantity.value = res.data["baseQuantity"];
      usedQuantity.value = res.data["usedQuantity"];
      description.value = res.data["description"];
      place.value = `${res.data["place"]['country']}, ${res.data["place"]['city']}`;
      console.log(res);

    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        router.push("/404");
      } else {
        console.log(error);
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
});

const showPeriodPopup = ref(false);
const togglePeriodPopup = () => {
  showPeriodPopup.value = !showPeriodPopup.value;
};
</script>

<template>
  <div v-if="isLoading" class="backdrop-filter backdrop-blur-md fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
  </div>
  <article v-else class="max-w-lg mx-auto">
    <div v-show="showPeriodPopup" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative rounded-lg shadow bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
            <h3 class="text-xl font-semibold text-white">طلب تأجير</h3>
            <button @click="togglePeriodPopup" type="button" class="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          <div class="p-4 md:p-5 space-y-4">
            <form @submit.prevent="submit" class="max-w-sm mx-auto">
              <div class="mb-5">
                <label for="period" class="block mb-2 text-sm font-medium text-white">مدة الحجز</label>
                <input v-model="period" type="number" id="period" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" />
              </div>

              <button @click="togglePeriodPopup" type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">تصفية</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-show="messages" class="p-4 mb-4 text-sm rounded-lg bg-gray-700 text-green-400">
      <span v-for="message in messages" :key="message">* {{ message }}.</span><br>
    </div>
    <div v-show="errors" class="p-4 mb-4 text-sm rounded-lg bg-gray-700 text-red-400">
      <span v-for="error in errors" :key="error">* {{ error }}.</span><br>
    </div>

    <div class="p-4 mb-2 border rounded-lg shadow border-white-400 text-lg">
      <img class="rounded-lg" :src="image" alt="صورة المنتج" />
    </div>
    <div class="p-4 text-white-400 text-lg">
      <h3><span class="font-bold">اسم المنتج: </span>{{ title }}</h3>
    </div>
    <div class="p-4 text-white-400 text-lg">
      <h3>
        <span class="font-bold">المؤجر: </span>
        <RouterLink class="py-2 px-3 rounded md:p-0 hover:text-blue-500 hover:bg-gray-700 hover:bg-transparent" :to="{ name: 'Profile', params: { id: userId }}">
          المالك
        </RouterLink>
      </h3>
    </div>
    <div class="p-4 text-white-400 text-lg">
      <h3><span class="font-bold">الوصف: </span>{{ description }}</h3>
    </div>
    <div class="p-4 text-white-400 text-lg">
      <h3><span class="font-bold">السعر: </span>{{ price }}$</h3>
    </div>
    <div class="p-4 text-white-400 text-lg">
      <h3><span class="font-bold">الكمية المتبقية: </span>{{ baseQuantity }} قطع</h3>
    </div>
    <div class="p-4 text-white-400 text-lg">
      <h3><span class="font-bold">العنوان: </span>{{ place }}</h3>
    </div>
    <div class="p-4 text-white-400 text-lg">
      <button @click="togglePeriodPopup" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" type="button" required>
        إستعارة
      </button>
    </div>
  </article>
</template>
