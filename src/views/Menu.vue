<script setup lang="ts">
import Select from "@/components/select.vue";
import SearchBar from "@/components/layouts/searchBar.vue";
import { ref, watch, onMounted, reactive, computed, onUnmounted, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  apiGetActiveList,
  apiGetScenicSpotList,
  apiGetRestaurantList,
  apiGetHotelList,
} from "@/api/request";

import Active from "@/components/menu/active.vue"

const route = useRoute();
const store = useStore();
const router = useRouter();
// const banner = ref(null);

// // 渲染上方 Title
const titleMap: Map<string, string> = new Map();
titleMap
  .set("/menu/active", "精選活動")
  .set("/menu/scenicSpot", "全台景點")
  .set("/menu/resturant", "探索美食")
  .set("/menu/hotel", "住宿飯店")
  .set("/menu/search", "搜尋結果");

const title = computed((): string => {
  return titleMap.get(route.path) as string;
});

// 渲染上方 Banner
const bannerMap: Map<string, string> = new Map();
bannerMap
  .set("/menu/active", "event_bn.jpg")
  .set("/menu/scenicSpot", "explore_bn.jpg")
  .set("/menu/resturant", "restaurant_bn.jpg")
  .set("/menu/hotel", "hotel_bn.jpg");

const bannerSrc = computed(() => {
  try {
    const url = bannerMap.get(route.path);
    return require(`@/assets/images/banner/${url}`);
  } catch {
    return require("@/assets/images/banner/event_bn.jpg");
  }
});

// onMounted(() => {
//   getPage(0);
// });

// const data = computed(() => {
//   if (route.path === "/menu/active") {
//     return store.getters.getActiveList;
//   } else if (route.path === "/menu/scenicSpot") {
//     return store.getters.getScenicSpotList;
//   } else if (route.path === "/menu/resturant") {
//     return store.getters.getRestaurantList;
//   } else if (route.path === "/menu/hotel") {
//     return store.getters.getGetHotelList;
//   } else if (route.path === "/menu/search") {
//     getSearchData();
//     return searchData.value;
//   }
// });

// const searchData = ref();
// const getSearchData = () => {
//   searchData.value = store.state.Search.searchData;
// };

// const idx = ref(1);
// const renderData = ref();

// // 拿到當前頁數的 10 筆資料
// const getPage = (index) => {
//   try {
//     renderData.value = data.value.slice(index, index + 10);
//     idx.value = index;
//     loadImg(renderData.value);
//   } catch (err) {
//     console.log(err);
//   }
// };

// // 計算按鈕數量
// const renderButton = computed(() => {
//   return Math.floor(data.value.length / 10);
// });

// const imgload = ref(false);
// const imgArr = ref([]);

// const loadImg = (data) => {
//   let totalImg = 0;
//   let i = 0;
//   data.forEach((element) => {
//     if (element.picture != undefined) {
//       totalImg += 1;
//     }
//   });
//   data.forEach((element, index) => {
//     const img = new Image();
//     img.src = element.picture;
//     img.onload = () => {
//       i += 1;
//       if (i === totalImg) {
//         imgload.value = true;
//         console.log("OK");
//       }
//     };
//   });
// };

const isload = ref<boolean>(false);

interface data {
  active: object;
  scenicSpot: object;
  resturant: object;
  hotel: object;
}

const data: data = reactive({
  active: {},
  scenicSpot: {},
  resturant: {},
  hotel: {},
});

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
      return apiGetHotelList();
    })
    .then((res) => {
      data.hotel = res.data;
      isload.value = true;
    })
    .catch((err) => {
      console.log(err);
    });
});

provide("data", data)

</script>
<template>
  <div
    class="banner"
    ref="banner"
    :style="{ backgroundImage: `url(${bannerSrc})` }"
  >
    <p>{{ title }}</p>
  </div>
  <SearchBar />

  <div class="select_bar">
    <div class="inner">
      <ul>
        <li>
          <router-link to="/menu/active">精選活動</router-link>
        </li>
        <li>
          <router-link to="/menu/scenicSpot">各地景點</router-link>
        </li>
        <li>
          <router-link to="/menu/resturant">探索美食</router-link>
        </li>
        <li>
          <router-link to="/menu/hotel">住宿飯店</router-link>
        </li>
      </ul>
      <Select />
    </div>
  </div>
  <div class="result" v-if="isload">
    <div class="event">
      <Active />
    </div>
    <div class="btns">

      <button
        v-for="(item, index) in 10"
        :key="item"
        :class="{ btn_select: index === idx }"
      >
        {{ index + 1 }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @include flexCenter(space-between, center);
  @include size(350px, 48%);
  min-height: 350px;
  position: relative;
  margin: 28px 0;
  background: linear-gradient(
      100deg,
      rgba(256, 256, 256, 0) 30%,
      rgba(256, 256, 256, 0.5) 50%,
      rgba(256, 256, 256, 0) 30%
    )
    #ededed;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 2s loading ease-in-out infinite;
  img {
    object-fit: cover;
    object-position: center;
    flex: 5.5;
    width: 50%;
    opacity: 0;
  }
  .detail {
    @include flexCenter(flex-start, space-between);
    flex-direction: column;
    flex: 4.5;
    padding: 20px 16px 60px 16px;
    line-height: 140%;
    background-color: #fff;
    opacity: 0.2;
  }
  h3 {
    background-color: #cccccc;
    width: 100%;
  }
  span {
    background-color: #cccccc;
    width: 100%;
    padding-right: 8px;
  }
  p {
    background-color: #cccccc;
    width: 100%;
  }
  button {
    position: absolute;
    right: 4%;
    bottom: 4%;
    opacity: 0;
  }
}
@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
.event-item {
  @include flexCenter(space-between, center);
  @include size(350px, 48%);
  min-height: 350px;
  position: relative;
  background-color: #fff;
  margin: 28px 0;
  img {
    object-fit: cover;
    object-position: center;
    flex: 5.5;
    width: 50%;
  }
  .detail {
    @include flexCenter(flex-start, space-between);
    flex-direction: column;
    flex: 4.5;
    padding: 20px 16px 60px 16px;
    line-height: 140%;
  }
  h3 {
    font-weight: 700;
    font-size: 20px;
  }
  span {
    font-weight: 700;
    padding-right: 8px;
  }
  button {
    position: absolute;
    background-color: #5b9bd5;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    padding: 8px 32px;
    border-radius: 16px;
    right: 4%;
    bottom: 4%;
  }
}
.banner {
  @include flexCenter(center, center);
  @include size(350px, 100%);
  // background-image: url("~@/assets/images/banner/event_bn.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  p {
    font-size: 4vmin;
    color: #fff;
    letter-spacing: 2px;
    font-weight: 700;
  }
}

.select_bar {
  @include flexCenter(center, center);
  width: 100%;
  background: $color_skin;

  .inner {
    @include flexCenter(center, space-between);
    width: 76%;
    border-bottom: 1px solid #bdbdbd;
    ul {
      @include flexCenter(center, center);
      li {
        cursor: pointer;
        padding: 8px;
        text-align: center;
        border-bottom: 8px solid rgba(88, 88, 211, 0);
        a {
          color: #000;
          padding: 8px;
          text-decoration: none;
        }
      }
    }
    .router-link-exact-active {
      border-bottom: 8px solid #5b9bd5;
      text-align: center;
    }
  }
}

.result {
  @include flexCenter(center, center);
  flex-direction: column;
  width: 100%;
  background-color: $color_skin;
  .event {
    @include flexCenter(center, space-between);
    flex-wrap: wrap;
    width: 76%;
    padding: 4% 0;
  }
}

.btns {
  @include flexCenter(center, center);
  width: 100%;
  background: $color_skin;
  padding: 20px 0;
  button {
    margin: 4px;
    padding: 4px 8px;
    cursor: pointer;
    border: 1px solid #dfe3e8;
    box-sizing: border-box;
    border-radius: 4px;
    color: #212b36;
    background-color: #fff;
  }
  .btn_select {
    background: #d69f8f;
    border: 1px solid #d69f8f;
    color: #fff;
  }
  .next_btn img {
    transform: rotate(180deg);
  }
}

@keyframes img-display {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>