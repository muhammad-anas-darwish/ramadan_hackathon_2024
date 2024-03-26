<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

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
      location.replace("/");
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
        <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
        <input v-model="email" type="email" id="email" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" placeholder="name@gmail.com" required />
      </div>
      <div class="mb-5">
        <label for="username" class="block mb-2 text-sm font-medium text-white">Username</label>
        <input v-model="username" type="text" id="username" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" placeholder="name" required />
      </div>
      <div class="mb-5">
        <label for="phone_number" class="block mb-2 text-sm font-medium text-white">Phone number</label>
        <div class="flex items-center">
          <button @click="togglePhoneNumbers" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border rounded-s-lg focus:ring-4 focus:outline-none bg-gray-700 hover:bg-gray-600 focus:ring-gray-700 text-white border-gray-600" type="button">
            +{{ countryCode }} <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" /></svg>
          </button>
          <div class="relative w-full">
            <input v-model="phoneNumber" type="phone" id="phone_number" class="block p-2.5 w-full z-20 text-s rounded-e-lg border-s-0 border focus:ring-blue-500 bg-gray-700 border-s-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500" pattern="[0-9]{10}" placeholder="0123456789" required />
          </div>
        </div>
        <!-- Country code popup -->
        <div v-show="showPhoneNumbers" class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0">
          <div class="relative p-4 w-52 max-w-2xl max-h-full">
            <div class="relative rounded-lg shadow bg-gray-700">
              <div class="flex items-center justify-between px-2 py-1 border-b rounded-t border-gray-600">
                <h3 class="text-xl font-semibold text-white">Countries</h3>
                <button @click="togglePhoneNumbers" type="button" class="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>
              <div class="z-10 divide-y divide-gray-100 rounded-lg shadow bg-gray-700">
                <ul class="overflow-y-auto max-h-48 py-2 text-sm text-gray-200">
                  <li>
                    <button @click="setCountryCode(1)" type="button" class="inline-flex w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white">
                      <div class="inline-flex items-center">United States (+1)</div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-5">
        <label for="country" class="block mb-2 text-sm font-medium text-white">Select an option</label>
        <select v-model="country" @change="changeCountry" id="country" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required>
          <option disabled value="">Choose a country</option>
          <option v-for="countryName in countries" :key="countryName['country']" :value="countryName['country']">{{ countryName["country"] }}</option>
        </select>
      </div>
      <div class="mb-5">
        <label for="city" class="block mb-2 text-sm font-medium text-white">Select an option</label>
        <select :disabled="country == ''" v-model="city" id="city" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required>
          <option disabled value="">Choose a city</option>
          <option v-for="cityName in cities" :key="cityName" :value="cityName">{{ cityName }}</option>
        </select>
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
        <input v-model="password" type="password" id="password" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" required />
      </div>
      <div class="mb-5">
        <RouterLink class="ms-2 text-sm font-medium hover:underline text-blue-500" :to="{ name: 'Login' }">I already have an account</RouterLink>
      </div>
      <button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Register</button>
    </form>
  </article>
</template>

<style></style>
