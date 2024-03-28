<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { checkCookie } from '../router/authGuard.js';
import router from '@/router/index.js';

const title = ref("");
const price = ref(0.0);
const image = ref('');
const country = ref("");
const city = ref("");
const quantity = ref(1);
const description = ref('');

const handleFileUpload = (e) => {
  const file = e.target.files[0];

  if (file.type.includes('image')) {
      image.value = file;
    } else {
      console.log('Please select a valid image file.');
    }
};

const submit = () => {
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('price', price.value);
  formData.append('country', country.value);
  formData.append('city', city.value);
  formData.append('baseQuantity', quantity.value);
  formData.append('description', description.value);

  // Check if an image file is selected
  if (image.value && image.value.type.includes('image')) {
    formData.append('image', image.value);
    
    axios
      .post(
        "http://localhost:3000/tool",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": checkCookie('Authorization'),
          },
        }
      )
      .then((res) => {
        console.log(res);
      router.push({ name: 'Home'});
        
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log('Please select a valid image file.');
  }
};

// country & city
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
]
);

const cities = ref([]);
const changeCountry = () => {
  cities.value = countries.value.find((c) => c.country === country.value).cities;
}

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
</script>

<template>
  <article>
    <form @submit.prevent="submit" class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="title" class="block mb-2 text-sm font-medium text-white">اسم الأداة</label>
        <input v-model="title" type="text" id="title" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" required />
      </div>
      <div class="mb-5">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الوصف</label>
        <textarea v-model="description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="اكتب وصف عن الأداة..." required></textarea>
      </div>
      <div class="mb-5">
        <label for="image" class="block mb-2 text-sm font-medium text-white">إضافة صورة</label>
        <input type="file" id="image" class="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" @change="handleFileUpload" accept=".jpg, .jpeg, .png" required />
      </div>
      <div class="mb-5">
        <label for="price" class="block mb-2 text-sm font-medium text-white">السعر</label>
        <input v-model="price" type="text" id="price" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" required />
      </div>
      <div class="mb-5">
        <label for="quantity" class="block mb-2 text-sm font-medium text-white">الكمية</label>
        <input v-model="quantity" type="text" id="quantity" class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" required />
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
      
      <button type="submit" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">إضافة</button>
    </form>
  </article>
</template>
