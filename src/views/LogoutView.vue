<script setup>
import router from "@/router/index.js";

document.cookie = "Authorization=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"; // remove token 
router.push({ name: "Home" }); // redirect to Home page
</script>

<template></template>

<style></style>
