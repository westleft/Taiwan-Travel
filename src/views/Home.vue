<script setup lang="ts">
import {
  apiGetActiveList,
  apiGetScenicSpotList,
  apiGetRestaurantList,
} from "@/api/index";
import { ref, onMounted, reactive, provide } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Active from "@/components/home/active.vue";
import Restaurant from "@/components/home/restaurant.vue";
import ScenicSpot from "@/components/home/scenicSpot.vue";
import SearchBar from "@/components/layouts/searchBar.vue";

const isload = ref<boolean>(false);

interface data {
  active: object;
  scenicSpot: object;
  resturant: object;
}
const data: data = reactive({ active: {}, scenicSpot: {}, resturant: {} });

onMounted(() => {
  apiGetActiveList()
    .then((res) => {
      data.active = res.data;
      return apiGetScenicSpotList();
    })
    .then((res) => {
      data.scenicSpot = res.data;
      return apiGetRestaurantList();
    })
    .then((res) => {
      data.resturant = res.data;
      isload.value = true;
    })
    .catch((err) => {
      console.log(err);
    });
});

// 傳至子層
provide("data", data);
</script>

<template>
  <div class="search-container">
    <SearchBar class="SearchBar" />
  </div>

  <div class="main-content" v-if="isload">
    <Active />
    <ScenicSpot />
    <Restaurant />
  </div>
</template>

<style lang="scss">
.search-container {
  @include flexCenter(center, center);
  @include size(450px, 100%);
  background-image: url("~@/assets/images/top_bg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;

  input {
    @include size(56px, 40%);
    position: relative;
    border: none;
    border-radius: 24px;
    padding-left: 52px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 24px;
    color: #bdbdbd;
    transition: 0.1s;
  }
  input:before {
    @include size(120px, 120px);
    content: "　";
    position: absolute;
    background-image: url("~@/assets/images/Vector.png");
  }
  input:focus {
    border: none;
    outline: #00447c80 solid 4px;
  }
}

.main-content {
  @include flexCenter(center, center);
  flex-direction: column;
  width: 100%;
  background-color: $color_skin;
  .event {
    @include flexCenter(center, space-between);
    flex-wrap: wrap;
    width: 76%;
    padding: 4% 0;
    h2 {
      width: 100%;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 40px;
    }
    h2::before {
      content: "　";
      background-image: url("~@/assets/images/event_icon.png");
      padding: 12px 12px 24px 12px;
      margin-right: 12px;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  .resturant {
    h2::before {
      content: "　";
      background-image: url("~@/assets/images/food_icon.png");
      padding: 24px 8px;
      background-size: contain;
    }
  }
}

// .more {
//   position: relative;
//   text-align: right;
//   font-weight: 700;
//   font-size: 24px;
//   cursor: pointer;
//   left: 36%;
//   text-decoration: none;
// }
// .more::after {
//   content: "";
//   background-image: url("~@/assets/images/arrow.png");
//   position: relative;
//   padding: 20px 100px;
//   background-position: center;
//   background-repeat: no-repeat;
//   right: 28%;
//   top: 8px;
// }

@keyframes img-display {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>