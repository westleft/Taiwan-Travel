<script>
import { ref, watch, onMounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const data = computed(() => {
      if (route.path === "/menu/active") {
        return store.getters.getActiveList;
      } else if (route.path === "/menu/scenicSpot") {
        return store.getters.getScenicSpotList;
      } else if (route.path === "/menu/resturant") {
        return store.getters.getRestaurantList;
      } else if (route.path === "/menu/hotel") {
        return store.getters.getGetHotelList;
      }
    });

    return { data };
  },
};
</script>
<template>
  <div class="banner">
    <p>精選活動</p>
  </div>

  <div class="search_bar">
    <input type="text" placeholder="所有縣市" />
  </div>

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
      <select>
        <option>主題分類</option>
        <option>台北縣</option>
        <option>台北縣</option>
        <option>台北縣</option>
      </select>
    </div>
  </div>

  <div class="result">
    <!-- <router-view></router-view> -->
    <div class="event">
      <div  v-for="item in data" :key="item" class="event-item">
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
    <div class="event"></div>
  </div>
</template>

<style lang="scss">
.banner {
  @include flexCenter(center, center);
  @include size(350px, 100%);
  background-image: url("~@/assets/images/banner/event_bn.jpg");
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

.search_bar {
  @include flexCenter(center, center);
  width: 100%;
  height: 200px;
  background: #e5e5e5;
  input {
    @include size(56px, 72%);
    position: relative;
    border: none;
    border-radius: 24px;
    padding-left: 52px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 24px;
    color: #bdbdbd;
    transition: 0.1s;
  }
  input:focus {
    border: none;
    outline: #00447c80 solid 4px;
  }
}

.select_bar {
  @include flexCenter(center, center);
  width: 100%;
  background: #e5e5e5;

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
          color: #fff;
          padding: 8px;
          text-decoration: none;
        }
      }
    }
    .router-link-exact-active {
      border-bottom: 8px solid #5b9bd5;
      text-align: center;
    }
    select {
      @include size(46px, 150px);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 25px;
      padding: 4px 16px;
      color: #bdbdbd;
      border: none;
    }
  }
}

.result {
  @include flexCenter(center, center);
  flex-direction: column;
  width: 100%;
  background-color: #e5e5e5;
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
  background: #e5e5e5;
  padding: 20px 0;
  button {
    margin: 4px;
    padding: 4px 8px;
    cursor: pointer;
    border: 1px solid #dfe3e8;
    box-sizing: border-box;
    border-radius: 4px;
    color: #212b36;
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