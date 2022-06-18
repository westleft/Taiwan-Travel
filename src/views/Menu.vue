<script setup lang="ts">
import Select from "@/components/select.vue";
import SearchBar from "@/components/layouts/searchBar.vue";
import { ref, onMounted, reactive, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  apiGetActiveList,
  apiGetScenicSpotList,
  apiGetRestaurantList,
  apiGetHotelList,
} from "@/api/index";

const route = useRoute();
const router = useRouter();

// 確認取得資料
const isload = ref<boolean>(false);

const titleData = reactive([
  { title: "精選活動", type: "active", img: "event_bn.jpg" },
  { title: "全台景點", type: "scenicSpot", img: "explore_bn.jpg" },
  { title: "探索美食", type: "restaurant", img: "restaurant_bn.jpg" },
  { title: "住宿飯店", type: "hotel", img: "hotel_bn.jpg" },
  { title: "搜尋結果", type: "search", img: "event_bn.jpg" },
]);

onMounted(() => {
  const apiUtil = new ApiUtil();
});

class ApiUtil {
  type: string;

  constructor() {
    this.type = route.params.type as string;
    this.send();
  }

  send() {
    apiGetActiveList()
      .then((res) => {
        data.Active = res.data;
        return apiGetScenicSpotList();
      })
      .then((res) => {
        data.ScenicSpot = res.data;
        return apiGetRestaurantList();
      })
      .then((res) => {
        data.Restaurant = res.data;
        return apiGetHotelList();
      })
      .then((res) => {
        data.Hotel = res.data;
        isload.value = true;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  search(text: string) {}
}

// 標題 & 背景圖片
const banner = ref<string>("active");
const title = computed((): string => {
  pageIndex.value = 1;
  let result: string = "";
  titleData.filter((item) => {
    if (route.params.type === item.type) {
      result = item.title;
      banner.value = item.type.toLowerCase();
    }
  });
  return result;
});

const data = reactive({
  Active: {},
  ScenicSpot: {},
  Restaurant: {},
  Hotel: {},
  Search: {}
});

// 下方按鈕頁數
const pageIndex = ref<number>(1);

// 搜尋資料
const getSearchData = (searchData: object) => {
  data.Search = searchData;
  router.push({ path: "/menu/search" });
};

watch(
  () => pageIndex.value,
  () => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  }
);

const type = computed((): string | string[] => {
  const t = route.params.type;
  // 轉字首大寫
  return t[0].toUpperCase() + t.slice(1);
});
</script>

<template>
  <div
    class="banner"
    :style="{
      'background-image': `url(${require(`@/assets/images/banner/${banner}_bn.jpg`)})`,
    }"
  >
    <p>{{ title }}</p>
  </div>

  <SearchBar @sendData="getSearchData" />

  <div class="select_bar">
    <div class="inner">
      <ul>
        <li v-for="item in titleData.slice(0, 4)" :key="item.title">
          <router-link :to="`/menu/${item.type}`">{{ item.title }}</router-link>
        </li>
      </ul>
      <Select />
    </div>
  </div>

  <div class="result" v-if="isload">
    <div class="event">
      <div
        v-for="item in data[type].slice(pageIndex, pageIndex + 10)"
        :key="item"
        class="event-item"
      >
        <img
          v-if="item.Picture.PictureUrl1"
          :src="item.Picture.PictureUrl1"
          :alt="item.Picture.PictureDescription1"
        />
        <img v-else src="@/assets/images/non-image.jpg" />

        <div class="detail">
          <h3 v-if="type === 'Active'">{{ item["ActivityName"] }}</h3>
          <h3 v-else-if="type === 'Search'">{{ item["ScenicSpotName"] }}</h3>
          
          <h3 v-else>{{ item[`${type}Name`] }}</h3>

          <p v-if="item.StartTime">
            <span>時間</span>{{ item.StartTime.slice(0, 10) }} -
            {{ item.EndTime.slice(0, 10) }}
          </p>
          <p v-else-if="item.OpenTime">
            <span>時間</span>
            {{ item.OpenTime ? item.OpenTime.slice(0, 20) : "尚無資訊" }}
          </p>
          <p v-else>
            <span>時間</span>
            尚無資訊
          </p>

          <p><span>地點</span>{{ item.Address ? item.Address : "尚無資訊" }}</p>
          <p v-if="item.Description">
            {{ item.Description.slice(0, 40) }}
            <span v-if="item.Description.length > 40">...</span>
          </p>

          <router-link :to="`/post/${item[`${type}ID`]}`">
            <button>活動詳情</button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="btns">
      <button
        v-for="(item, index) in 10"
        :key="item"
        :class="{ btn_select: index + 1 === pageIndex }"
        @click="pageIndex = index + 1"
      >
        {{ index + 1 }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  @include flexCenter(center, center);
  @include size(350px, 100%);
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
</style>