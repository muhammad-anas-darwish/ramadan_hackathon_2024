<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import router from '@/router/index.js';

const email = ref("");
const username = ref("");
const countryCode = ref(1);
const phoneNumber = ref("");
const country = ref("");
const city = ref("");
const password = ref("");

// countries & cities
const countries = ref([
  {
    country: "الجزائر",
    cities: ["الجزائر العاصمة", "عنابة", "العزازقة", "مدينة باتنة", "البليدة", "البرج", "برج بوعريريج", "بوغارة", "شيراجا", "الشلف", "قسنطينة", "الجلفة", "دراريا", "الطارف", "حسين داي", "إليزي", "جيجل", "كوبا", "الأغواط", "وهران", "ورقلة", "واد سمار", "غليزان", "الرويبة", "صيدا", "سوق أهراس", "تمنغاست", "تيارت", "تيسمسيلت", "تيزي", "تيزي وزو", "تلمسان"],
  },
  {
    country: "البحرين",
    cities: ["البديع", "الهملة", "الجنبية", "المرخ", "المحرق", "بني جمرة", "باربار", "جرداب", "مدينة عيسى", "مدينة حمد", "المنامة", "مدينة النفط", "السنابس", "سند", "سترة", "توبلي"],
  },
  {
    country: "جزر القمر",
    cities: ["القمر الكبرى (نجازيدجا)", "أنجوان (نزواني)", "موهيلي (موالي)"],
  },
  {
    country: "جيبوتي",
    cities: ["علي صبيح", "دخيل", "جيبوتي", "أوبوك", "تاجورا"],
  },
  {
    country: "مصر",
    cities: ["أبو حماد", "المحلة الكبرى", "المنصورة", "المرج", "الإسكندرية", "الماظة", "الروضة", "أسيوط", "الزمالك", "بدر", "بنها", "بني سويف", "القاهرة", "دمياط", "فاراسكور", "فلامينج", "الجيزة", "مصر الجديدة", "حلوان", "الغردقة", "الإسماعيلية", "كفر الشيخ", "الأقصر", "مدينة النصر", "مدينة ساديس من أوكتوبار", "المنيا", "نصر", "القاهرة الجديدة", "بورسعيد", "رفح", "رمسيس", "السادات", "شربين", "شبرا", "سوهاج", "السويس", "طنطا", "طوخ", "الزقازيق"],
  },
  {
    country: "العراق",
    cities: ["العمارة", "الحلة", "بغداد", "بحر", "باسير", "البصرة", "أربيل", "الحاج حسن", "حياة", "الكرخ", "كركوك", "مناوي", "الموصل", "النجف", "السليمانية", "تكريت"],
  },
  {
    country: "الأردن",
    cities: ["عجلون", "العقبة", "البلقاء", "الكرك", "المفرق", "عمان", "في الطفيلة", "الزرقاء", "إربد", "جرش", "معان", "مادبا"],
  },
  {
    country: "الكويت",
    cities: ["أبرق خيطان", "الدسمة", "الدوحة", "الأحمدي", "الفروانية", "الشامية", "الروضة", "السالمية", "الشعيبة", "الشويخ", "بيان", "حولي", "جنوب السرة", "كيفان", "مدينة الكويت", "سلوى"],
  },
  {
    country: "لبنان",
    cities: ["عاليه", "أدما", "الأشرفية", "بعبدا", "بعلبك", "بيروت", "برمانا", "بصاليم", "شكا", "ضبية", "ديك المهدي", "حلبا", "حبوب", "ساربا", "صيدا", "طرابلس", "يانار", "زغرتا"],
  },
  {
    country: "ليبيا",
    cities: ["بنغازي", "مصراتة", "سبها", "طرابلس", "زليتن"],
  },
  {
    country: "موريتانيا",
    cities: ["أدرار", "العصبة", "البراكنة", "داخلة نواذيبو", "غورغول", "غيديماكا", "حوض شرقي", "الحوض الغربي", "إنشيري", "نواكشوط", "تكانت", "تيرس زمور", "الترارزة"],
  },
  {
    country: "المغرب",
    cities: ["أفورير", "أغادير", "آيت ملول", "الحسيمة", "آسا", "بن جرير", "بني ملال", "برشيد", "الدار البيضاء", "ديروا", "الجارا", "الحاجب", "الجديدة", "أرفود", "فاس", "الفقيه بن صلاح", "القنيطرة", "الخميسات", "خريبكة", "القصر الكبير", "العرائش", "منصور", "مراكش", "المهدية", "مكناس", "المحمدية", "الناظور", "وازان", "واد زم", "وجدة", "أولاد تيمة", "الرباط", "صافي", "صفرو", "سطات", "سيدي بنور", "سيدي سليمان", "الصخيرات", "تهالة", "طانطان", "طنجة", "طرفاية", "تازة", "تمارة", "تيفلت", "تزنيت", "التويسيت"],
  },
  {
    country: "عمان",
    cities: ["الصحار", "مسقط", "نزوى", "روي", "سهام", "صلالة", "الصمد"],
  },
  {
    country: "قطر",
    cities: ["الدوحة", "الغويرية", "الجميلية", "الخور", "الوكرة", "الريان", "جرايان الباطنة", "مدينة الشمال", "أم سعيد", "أم صلاح"],
  },
  {
    country: "المملكة العربية السعودية",
    cities: ["أبها", "بقيق", "الباحة", "الفاروق", "الهفوف", "القطيف", "اليمامة", "في الطوال", "بريدة", "الدمام", "الظهران", "هايل", "الجزيرة", "جدة", "جيزان", "الجبيل", "خميس مشيط", "مدينه الخبر", "خليص", "لينا", "مدينة ينبع الصناعية", "مكة المكرمة", "المدينة المنورة", "مينا", "نجران", "رابغ", "رحيمة", "الرحمن", "الرمضه", "رأس تنورة", "الرياض", "صبيا", "الصفوة", "سكاكا", "سامباه", "سيهات", "تبوك", "ينبع البحر"],
  },
  {
    country: "الصومال",
    cities: ["أودال", "باكول", "بنادير", "باري", "خليج", "جالجودود", "جدو", "هيران", "جوبادا ديكسي", "جوبادا هوس", "مدق", "نوجال", "سناج", "شبيلاها ديكسي", "شبيلاها هوس", "سول", "تغدير", "ووكوي جالبيد"],
  },
  {
    country: "السودان",
    cities: ["كسلا", "الخرطوم", "نيالا", "شندي", "ثابت", "أم درمان"],
  },
  {
    country: "سوريا",
    cities: ["الحسكة", "اللاذقية", "القنيطرة", "الرقة", "السويداء", "درعا", "دير الزور", "دمشق", "حلب", "حماة", "هيمز", "إدلب", "ريف دمشق", "طرطوس"],
  },
  {
    country: "تونس",
    cities: ["أريانة", "باجا", "قفصة", "الحمامات", "لو باردو", "منوبة", "المنستير", "رادز", "صفاقس", "سيدي بوزيد", "سوسة", "تونس"],
  },
  {
    country: "الإمارات العربية المتحدة",
    cities: ["أبو ظبي", "العين", "الخان", "الرويس", "السطوة", "ديرة", "دبي", "الفجيرة", "رأس الخيمة", "الشارقة"],
  },
  {
    country: "اليمن",
    cities: ["أبين", "عدان", "الضالع", "البيضاء", "الحديدة", "الجوف", "المهرة", "المحويت", "عمران", "ذمار", "حضرموت", "الحجّة", "إب", "لحج", "مأرب", "صعدة", "صنعاء'", "شبوة", "تعز"],
  },
]);
const cities = ref([]);
const changeCountry = () => {
  cities.value = countries.value.find((c) => c.country === country.value).cities;
};

// Load countries & cities
onMounted(() => {
  axios
    .get("/countries")
    .then((res) => {
      // countries.value = res["data"];
      // cities.value = [];
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
});

const errors = ref(0);

// regiseter
const submit = () => {
  axios
    .post("http://localhost:3000/auth/signup", {
      userInfo: {
        email: email.value,
        username: username.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
      },
      countryInfo: {
        country: country.value,
        city: city.value,
      },
    })
    .then((res) => {
      document.cookie = `Authorization=${res.data['accessToken']}`;

      router.push({ name: 'Home'});
    })
    .catch((error) => {
      let message = error.response['data']['message'];
      console.log(message);
      if (typeof message === 'string') {
        errors.value = [message];
      }
      else {
        errors.value = message.map(msg => msg.split('.')[1]);
      }
    });
};

// phone number
function togglePhoneNumbers() {
  showPhoneNumbers.value = !showPhoneNumbers.value;
}
const showPhoneNumbers = ref(false);
const setCountryCode = (code) => {
  countryCode.value = code;
  togglePhoneNumbers();
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
        <label for="username" class="block mb-2 text-sm font-medium text-white">اسم المسخدم</label>
        <input v-model="username" type="text" id="username" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" placeholder="الاسم" required />
      </div>
      <div class="mb-5">
        <label for="phone_number" class="block mb-2 text-sm font-medium text-white">رقم الجوال</label>
        <div class="relative w-full">
          <input v-model="phoneNumber" type="phone" id="phone_number" class="block p-2.5 w-full z-20 text-s rounded-lg border-s-0 border focus:ring-blue-500 bg-gray-700 border-s-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500" pattern="[0-9]{10}" placeholder="0123456789" required />
        </div>
      </div>
      <div class="mb-5">
        <label for="country" class="block mb-2 text-sm font-medium text-white">إختر عنصر</label>
        <select v-model="country" @change="changeCountry" id="country" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required>
          <option disabled value="">حدد دولة</option>
          <option v-for="countryName in countries" :key="countryName['country']" :value="countryName['country']">{{ countryName["country"] }}</option>
        </select>
      </div>
      <div class="mb-5">
        <label for="city" class="block mb-2 text-sm font-medium text-white">إختر عنصر</label>
        <select :disabled="country == ''" v-model="city" id="city" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required>
          <option disabled value="">حدد مدينة</option>
          <option v-for="cityName in cities" :key="cityName" :value="cityName">{{ cityName }}</option>
        </select>
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-white">كلمة المرور</label>
        <input v-model="password" type="password" id="password" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" required />
      </div>
      <div class="mb-5">
        <RouterLink class="ms-2 text-sm font-medium hover:underline text-blue-500" :to="{ name: 'Login' }">لدي حساب بالفعل</RouterLink>
      </div>
      <button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">إنشاء حساب</button>
    </form>
  </article>
</template>

<style></style>
