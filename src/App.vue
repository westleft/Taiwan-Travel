<script setup lang="ts">
import Header from "./components/layouts/header.vue";
import Footer from "./components/layouts/footer.vue";

// import { ApiUnit } from "@/api/index";
// import { onMounted, provide, ref } from "vue";

// const isload = ref<boolean>(false)

// const data = ref({
//   Active: {},
//   ScenicSpot: {},
//   Restaurant: {},
//   Hotel: {},
// });

// onMounted(() => {
//   const apiUnit = new ApiUnit();
//   apiUnit
//     .send("Activity")
//     .then((res) => {
//       data.value.Active = res as object;
//       return apiUnit.send("ScenicSpot");
//     })
//     .then((res) => {
//       data.value.ScenicSpot = res as object;
//       return apiUnit.send("Restaurant");
//     })
//     .then((res) => {
//       data.value.Restaurant = res as object;
//       return apiUnit.send("Hotel");
//     })
//     .then((res) => {
//       data.value.Hotel = res as object;
//     });
// });

// provide("dataaa", data)
</script>
<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>