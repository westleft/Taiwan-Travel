<script>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";

import Active from "../components/home/active.vue"
import Restaurant from "../components/home/restaurant.vue"
import ScenicSpot from "../components/home/scenicSpot.vue"

export default {
  components: {
    Active,
    // Restaurant,
    // ScenicSpot
  },
  setup() {
    const store = useStore()
    // console.log(store.state.data)
    // console.log(store.getters.getActiveList)
    return {};
  },
};
</script>

<template>
  <div class="search-container">
    <input type="text" placeholder="我想去..." />
  </div>

  <div class="main-content">
    <div class="event">
        <Active />
    </div>
    <a href="./page/" class="more">More</a>
    <div class="attractions activity">
      <!-- <ScenicSpot /> -->
    </div>
    <div class="attractions resturant">
      <!-- <Restaurant /> -->
    </div>
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
  background-color: #e5e5e5;
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
.more {
  position: relative;
  text-align: right;
  font-weight: 700;
  font-size: 24px;
  cursor: pointer;
  left: 36%;
  text-decoration: none;
}
.more::after {
  content: "";
  background-image: url("~@/assets/images/arrow.png");
  position: relative;
  padding: 20px 100px;
  background-position: center;
  background-repeat: no-repeat;
  right: 28%;
  top: 8px;
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