<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, RouterLink } from "vue-router";
import router from '@/router/index.js';

const route = useRoute();

const username = ref('');
const email = ref('');
const phoneNumber = ref('');
const place = ref('');

onMounted(() => {
  axios
    .get(`/profile/${route.params.id}`)
    .then((res) => {
      username.value = res.data['username'];
      email.value = res.data['email'];
      phoneNumber.value = res.data['phoneNumber'];
      place.value = res.data['place'];
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
    <article class="max-w-sm mx-auto">
        <div class="p-4 mb-2 text-white-400 text-lg">
            <h3 class="font-bold">اسم المستخدم</h3>
            <p class="mr-2">{{ username }}</p>
        </div>
        <div class="p-4 mb-2 text-white-400 text-lg">
            <h3 class="font-bold">البريد الإلكتروني</h3>
            <p>{{ email }}</p>
        </div>
        <div class="p-4 mb-2 text-white-400 text-lg">
            <h3 class="font-bold">رقم الجوال</h3>
            <p>{{ phoneNumber }}</p>
        </div>
        <div class="p-4 mb-2 text-white-400 text-lg">
            <h3 class="font-bold">العنوان</h3>
            <p>{{ place }} </p>
        </div>
    </article>
</template>