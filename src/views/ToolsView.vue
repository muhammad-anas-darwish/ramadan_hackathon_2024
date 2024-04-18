<script setup>
import { ref, onMounted } from "vue";
import { checkCookie } from '../router/authGuard.js';

import axios from "axios";

// Filter popup Fields
const title = ref("");
const place = ref("");
const minPrice = ref("");
const maxPrice = ref("");

const cardsData = ref([]);
const isLoading = ref(false);

const country = ref("");
const city = ref("");

const thereAreFilters = ref(0);
const removeFilters = () => {
  thereAreFilters.value = 0;
  getData();
};

const countries = ref([
  {
    "country": "الجزائر",
    "cities": [
        "الجزائر العاصمة",
        "عنابة",
        "العزازقة",
        "مدينة باتنة",
        "البليدة",
        "البرج",
        "برج بوعريريج",
        "بوغارة",
        "شيراجا",
        "الشلف",
        "قسنطينة",
        "الجلفة",
        "دراريا",
        "الطارف",
        "حسين داي",
        "إليزي",
        "جيجل",
        "كوبا",
        "الأغواط",
        "وهران",
        "ورقلة",
        "واد سمار",
        "غليزان",
        "الرويبة",
        "صيدا",
        "سوق أهراس",
        "تمنغاست",
        "تيارت",
        "تيسمسيلت",
        "تيزي",
        "تيزي وزو",
        "تلمسان"
    ]
  },
  {
    "country": "البحرين",
    "cities": [
        "البديع",
        "الهملة",
        "الجنبية",
        "المرخ",
        "المحرق",
        "بني جمرة",
        "باربار",
        "جرداب",
        "مدينة عيسى",
        "مدينة حمد",
        "المنامة",
        "مدينة النفط",
        "السنابس",
        "سند",
        "سترة",
        "توبلي"
    ]
  },
  {
    "country": "جزر القمر",
    "cities": ["القمر الكبرى (نجازيدجا)", "أنجوان (نزواني)", "موهيلي (موالي)"]
  },
  {
    "country": "جيبوتي",
    "cities": ["علي صبيح", "دخيل", "جيبوتي", "أوبوك", "تاجورا"]
  },
  {
    "country": "مصر",
    "cities": [
    "أبو حماد",
    "المحلة الكبرى",
    "المنصورة",
    "المرج",
    "الإسكندرية",
    "الماظة",
    "الروضة",
    "أسيوط",
    "الزمالك",
    "بدر",
    "بنها",
    "بني سويف",
    "القاهرة",
    "دمياط",
    "فاراسكور",
    "فلامينج",
    "الجيزة",
    "مصر الجديدة",
    "حلوان",
    "الغردقة",
    "الإسماعيلية",
    "كفر الشيخ",
    "الأقصر",
    "مدينة النصر",
    "مدينة ساديس من أوكتوبار",
    "المنيا",
    "نصر",
    "القاهرة الجديدة",
    "بورسعيد",
    "رفح",
    "رمسيس",
    "السادات",
    "شربين",
    "شبرا",
    "سوهاج",
    "السويس",
    "طنطا",
    "طوخ",
    "الزقازيق"
    ]
  },
  {
    "country": "العراق",
    "cities": [
        "العمارة",
        "الحلة",
        "بغداد",
        "بحر",
        "باسير",
        "البصرة",
        "أربيل",
        "الحاج حسن",
        "حياة",
        "الكرخ",
        "كركوك",
        "مناوي",
        "الموصل",
        "النجف",
        "السليمانية",
        "تكريت"
    ]
  },
  {
    "country": "الأردن",
    "cities": [
        "عجلون",
        "العقبة",
        "البلقاء",
        "الكرك",
        "المفرق",
        "عمان",
        "في الطفيلة",
        "الزرقاء",
        "إربد",
        "جرش",
        "معان",
        "مادبا"
    ]
  },
  {
    "country": "الكويت",
    "cities": [
        "أبرق خيطان",
        "الدسمة",
        "الدوحة",
        "الأحمدي",
        "الفروانية",
        "الشامية",
        "الروضة",
        "السالمية",
        "الشعيبة",
        "الشويخ",
        "بيان",
        "حولي",
        "جنوب السرة",
        "كيفان",
        "مدينة الكويت",
        "سلوى"
    ]
  },
  {
    "country": "لبنان",
    "cities": [
        "عاليه",
        "أدما",
        "الأشرفية",
        "بعبدا",
        "بعلبك",
        "بيروت",
        "برمانا",
        "بصاليم",
        "شكا",
        "ضبية",
        "ديك المهدي",
        "حلبا",
        "حبوب",
        "ساربا",
        "صيدا",
        "طرابلس",
        "يانار",
        "زغرتا"
    ]
  },
  {
    "country": "ليبيا",
    "cities": ["بنغازي", "مصراتة", "سبها", "طرابلس", "زليتن"]
  },
  {
    "country": "موريتانيا",
    "cities": [
    "أدرار",
    "العصبة",
    "البراكنة",
    "داخلة نواذيبو",
    "غورغول",
    "غيديماكا",
    "حوض شرقي",
    "الحوض الغربي",
    "إنشيري",
    "نواكشوط",
    "تكانت",
    "تيرس زمور",
    "الترارزة"
    ]
  },
  {
    "country": "المغرب",
    "cities": [
    "أفورير",
    "أغادير",
    "آيت ملول",
    "الحسيمة",
    "آسا",
    "بن جرير",
    "بني ملال",
    "برشيد",
    "الدار البيضاء",
    "ديروا",
    "الجارا",
    "الحاجب",
    "الجديدة",
    "أرفود",
    "فاس",
    "الفقيه بن صلاح",
    "القنيطرة",
    "الخميسات",
    "خريبكة",
    "القصر الكبير",
    "العرائش",
    "منصور",
    "مراكش",
    "المهدية",
    "مكناس",
    "المحمدية",
    "الناظور",
    "وازان",
    "واد زم",
    "وجدة",
    "أولاد تيمة",
    "الرباط",
    "صافي",
    "صفرو",
    "سطات",
    "سيدي بنور",
    "سيدي سليمان",
    "الصخيرات",
    "تهالة",
    "طانطان",
    "طنجة",
    "طرفاية",
    "تازة",
    "تمارة",
    "تيفلت",
    "تزنيت",
    "التويسيت"
    ]
  },
  {
    "country": "عمان",
    "cities": [
        "الصحار",
        "مسقط",
        "نزوى",
        "روي",
        "سهام",
        "صلالة",
        "الصمد"
    ]
  },
  {
    "country": "قطر",
    "cities": [
       "الدوحة",
       "الغويرية",
       "الجميلية",
       "الخور",
       "الوكرة",
       "الريان",
       "جرايان الباطنة",
       "مدينة الشمال",
       "أم سعيد",
       "أم صلاح"
    ]
  },
  {
    "country": "المملكة العربية السعودية",
    "cities": [
        "أبها",
       "بقيق",
       "الباحة",
       "الفاروق",
       "الهفوف",
       "القطيف",
       "اليمامة",
       "في الطوال",
       "بريدة",
       "الدمام",
       "الظهران",
       "هايل",
       "الجزيرة",
       "جدة",
       "جيزان",
       "الجبيل",
       "خميس مشيط",
       "مدينه الخبر",
       "خليص",
       "لينا",
       "مدينة ينبع الصناعية",
       "مكة المكرمة",
       "المدينة المنورة",
       "مينا",
       "نجران",
       "رابغ",
       "رحيمة",
       "الرحمن",
       "الرمضه",
       "رأس تنورة",
       "الرياض",
       "صبيا",
       "الصفوة",
       "سكاكا",
       "سامباه",
       "سيهات",
       "تبوك",
       "ينبع البحر"
    ]
  },
  {
    "country": "الصومال",
    "cities": [
        "أودال",
       "باكول",
       "بنادير",
       "باري",
       "خليج",
       "جالجودود",
       "جدو",
       "هيران",
       "جوبادا ديكسي",
       "جوبادا هوس",
       "مدق",
       "نوجال",
       "سناج",
       "شبيلاها ديكسي",
       "شبيلاها هوس",
       "سول",
       "تغدير",
       "ووكوي جالبيد"
    ]
  },
  {
    "country": "السودان",
    "cities": ["كسلا", "الخرطوم", "نيالا", "شندي", "ثابت", "أم درمان"]
  },
  {
    "country": "سوريا",
    "cities": [
       "الحسكة",
       "اللاذقية",
       "القنيطرة",
       "الرقة",
       "السويداء",
       "درعا",
       "دير الزور",
       "دمشق",
       "حلب",
       "حماة",
       "هيمز",
       "إدلب",
       "ريف دمشق",
       "طرطوس"
    ]
  },
  {
    "country": "تونس",
    "cities": [
        "أريانة",
        "باجا",
        "قفصة",
        "الحمامات",
        "لو باردو",
        "منوبة",
        "المنستير",
        "رادز",
        "صفاقس",
        "سيدي بوزيد",
        "سوسة",
        "تونس"
    ]
  },
  {
    "country": "الإمارات العربية المتحدة",
    "cities": [
        "أبو ظبي",
        "العين",
        "الخان",
        "الرويس",
        "السطوة",
        "ديرة",
        "دبي",
        "الفجيرة",
        "رأس الخيمة",
        "الشارقة"
    ]
  },
  {
    "country": "اليمن",
    "cities": [
       "أبين",
       "عدان",
       "الضالع",
       "البيضاء",
       "الحديدة",
       "الجوف",
       "المهرة",
       "المحويت",
       "عمران",
       "ذمار",
       "حضرموت",
       "الحجّة",
       "إب",
       "لحج",
       "مأرب",
       "صعدة",
       "صنعاء'",
       "شبوة",
       "تعز"
    ]
  }
]);

const cities = ref([]);
const changeCountry = () => {
  cities.value = countries.value.find((c) => c.country === country.value).cities;
}

// Filter popup
const showFilterPopup = ref(false);
const toggleFilterPopup = () => {
  showFilterPopup.value = !showFilterPopup.value;
};
const submitFilter = () => {
  axios
    .get("http://localhost:3000/tool", {
      params: {
        title: title.value,
        country: country.value,
        city: city.value,
        minPrice: minPrice.value,
        maxPrice: maxPrice.value,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": checkCookie('Authorization'),
      }
    })
    .then((res) => {
      cardsData.value = res["data"];
      thereAreFilters.value = 1;
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getData = () => {
 isLoading.value = true;
 axios
    .get(`http://localhost:3000/tool`, 
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": checkCookie('Authorization'),
      },
    })
    .then((res) => {
    console.log(res);
      cardsData.value = res.data;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

// load tools data
onMounted(() => {
  getData();
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
      <button class="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-gray-300 bg-gray-500 hover:bg-gray-600 focus:ring-gray-700 ml-3">
        <RouterLink :to="{ name: 'Tools.Create' }"> إضافة أداة جديدة </RouterLink>
      </button>
      <button @click="toggleFilterPopup" class="block focus:ring-4 focus:outline-none rounded-full p-2.5 text-center bg-gray-500 hover:bg-gray-600 focus:ring-gray-700" type="button">
        <svg class="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </button>
      <button v-show="thereAreFilters" @click="removeFilters" class="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-gray-300 bg-gray-500 hover:bg-gray-600 focus:ring-gray-700 mr-3">
        إزالة الفلاتر
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
                <label for="title" class="block mb-2 text-sm font-medium text-white">اسم الأداة</label>
                <input v-model="title" type="text" id="title" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" />
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
                <label for="min-price" class="block mb-2 text-sm font-medium text-white">السعر</label>
                <div class="flex justify-between gap-4">
                  <input v-model="minPrice" type="number" id="min-price" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" min="0" placeholder="الحد الأدنى" />
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
        <img class="p-4 rounded-t-lg" :src="`http://localhost:3000/tool/image/${card.image}`" alt="صورة المنتج" />
        <div class="px-5 pb-5">
          <RouterLink class="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent" :to="{ name: 'Tool',  params: { id: card.id } }"> 
            <h5 class="text-xl font-semibold tracking-tight text-gray-200">
              {{ card.title }}
            </h5>
          </RouterLink>
          <div class="mt-2.5 mb-2.5 break-words text-xl text-gray-400">{{ card.place.country }}, {{ card.place.city }}</div>
          <div class="mt-2.5 mb-2.5 break-words text-xl text-gray-400">{{ card.usedQuantity  }}/{{ card.baseQuantity}} القطع المستخدمة</div>
          <RouterLink class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" :to="{ name: 'Tool',  params: { id: card.id } }"> 
              إستعارة
            </RouterLink>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>
