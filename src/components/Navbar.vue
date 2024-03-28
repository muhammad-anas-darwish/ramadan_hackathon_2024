<template>
  <nav class="border-gray-200 bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <!-- Logo -->
      <RouterLink class="text-2xl font-semibold whitespace-nowrap text-white" :to="{ name: 'Home' }"> أجرني.كوم </RouterLink>
      <!-- toggle button -->
      <button @click="toggleNavbar" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <!-- Pages -->
      <div :class="{ 'hidden md:block': showNavbar }" class="w-full md:w-auto">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
          <li>
            <RouterLink v-if="isAuthorize" class="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent" :to="{ name: 'Home' }"> الصفحة الرئيسية </RouterLink>
          </li>
          <li v-if="isAuthorize">
            <RouterLink class="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent" :to="{ name: 'MyProfile' }"> الملف الشخصي </RouterLink>
          </li>
          <li v-if="isAuthorize">
            <RouterLink class="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent" :to="{ name: 'UserTransactions' }"> العمليات </RouterLink>
          </li>
          <li v-if="isAuthorize">
            <RouterLink class="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent" :to="{ name: 'TransactionRequestsView' }"> طلبات التأجير </RouterLink>
          </li>
          <li v-if="isAuthorize">
            <RouterLink class="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent" :to="{ name: 'Logout' }"> تسجيل الخروج </RouterLink>
          </li>
          <li v-else>
            <RouterLink class="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent" :to="{ name: 'Register' }"> إنضمام </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { checkCookie } from "@/router/authGuard.js";

const route = useRoute();

// toggle navbar
const showNavbar = ref(true);
function toggleNavbar() {
  showNavbar.value = !showNavbar.value;
}

// update user is authorize value
const isAuthorize = ref(false);

watch(route, async (newQuestion, oldQuestion) => {
  isAuthorize.value = checkCookie("Authorization");
});
onMounted(() => {
  isAuthorize.value = checkCookie("Authorization");
});
</script>
