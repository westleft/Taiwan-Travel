<script setup>
import Select from "@/components/select.vue";
import SearchBar from "@/components/layouts/searchBar.vue";
import { ref, watch, onMounted, reactive, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();
const router = useRouter();
const banner = ref(null);

const titleMap = new Map();
titleMap
  .set("/menu/active", "精選活動")
  .set("/menu/scenicSpot", "全台景點")
  .set("/menu/resturant", "探索美食")
  .set("/menu/hotel", "住宿飯店")
  .set("/menu/search", "搜尋結果");

const title = computed(() => {
  return titleMap.get(route.path);
});

const bannerMap = new Map();
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

onMounted(() => {
  getPage(0);
});

const data = computed(() => {
  if (route.path === "/menu/active") {
    return store.getters.getActiveList;
  } else if (route.path === "/menu/scenicSpot") {
    return store.getters.getScenicSpotList;
  } else if (route.path === "/menu/resturant") {
    return store.getters.getRestaurantList;
  } else if (route.path === "/menu/hotel") {
    return store.getters.getGetHotelList;
  } else if (route.path === "/menu/search") {
    getSearchData();
    return searchData.value;
  }
});

const searchData = ref();
const getSearchData = () => {
  searchData.value = store.state.Search.searchData;
};

const idx = ref(1);
const renderData = ref();

const getPage = (index) => {
  try {
    renderData.value = data.value.slice(index, index + 10);
    idx.value = index;
  } catch (err) {
    console.log(err);
  }
};

watch(
  () => data.value,
  () => {
    if (route.path.includes("menu")) {
      getPage(0);
    }
  }
);
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
  <div class="result">
    <!-- <router-view></router-view> -->
    <div class="event">
      <div v-for="item in renderData" :key="item" class="event-item">
        <img v-if="item.picture" :src="item.picture" alt="" />
        <img v-else src="~@/assets/images/non-image.jpg" />

        <div class="detail">
          <h3>{{ item.name }}</h3>
          <p><span>時間</span>{{ item.startTime }} - {{ item.endTime }}</p>
          <p><span>地點</span>{{ item.city }}</p>
          <p>{{ item.description }}</p>

          <router-link :to="`/post/${item.id}`">
            <button>活動詳情</button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="btns">
      <button
        v-for="(item, index) in data.length / 10"
        :key="item"
        @click="getPage(index)"
        :class="{ btn_select: index === idx }"
      >
        {{ index + 1 }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
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