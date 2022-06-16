<script setup lang="ts">
import { ref, inject } from "vue";

const data = inject<object>("data");
const index = ref<number>(0);

interface data {
  resturant: {
    length: number;
  };
}

const changePage = (symbol: string): void => {
  if (index.value === 0 && symbol === "-") return;
  if (index.value >= (<data>data).resturant.length - 4 && symbol === "+") return;

  if (symbol === "+") index.value += 4;
  else index.value -= 4;
};
</script>
<template>
  <section>
    <h2>推薦美食</h2>
    <div class="slider">
      <router-link
        v-for="item in data.resturant.slice(index, index + 4)"
        :key="item"
        class="slider-item"
        :to="`/post/${item.id}`"
      >
        <img
          v-if="item.Picture.PictureUrl1"
          :src="item.Picture.PictureUrl1"
          :alt="item.PictureDescription1"
        />
        <img v-else src="@/assets/images/non-image.jpg" alt="" />
        <h3>{{ item.RestaurantName }}</h3>
        <p v-if="item.Address">{{ item.Address.slice(0, 3) }}</p>
      </router-link>
    </div>
    <button class="attr_next btn_next" @click="changePage('+')"></button>
    <button class="attr_back btn_back" @click="changePage('-')"></button>
    <div class="read_more_container">
      <router-link to="/menu/scenicSpot" class="more">
        <img src="@/assets/images/ream_more.png" alt="" />
      </router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  @include flexCenter(center, center);
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding-bottom: 20px;
  h2 {
    width: 100%;
  }
  .read_more_container {
    @include flexCenter(center, flex-end);
    width: 100%;
    padding: 16px 0;
  }
}

section {
  @include flexCenter(center, center);
  position: relative;
  flex-direction: column;
  width: 100%;
  h2 {
    @include flexCenter(center, center);
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    padding: 20px 0;
  }
  h2::before {
    @include flexCenter(center, center);
    content: "";
    background-image: url("~@/assets/images/food_icon.png");
    width: 40px;
    height: 64px;
    margin-right: 12px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .slider {
    @include flexCenter(center, space-between);
    flex-wrap: wrap;
    position: relative;
    width: 100%;
    .slider-item {
      @include flexCenter(flex-start, flex-start);
      flex-direction: column;
      width: 20%;
      height: 350px;
      background-color: #fff;
      padding-bottom: 12px;
      margin: 20px 0;
      transition: 0.2s;
      text-decoration: none;
      animation: img-display ease-out 0.3s;
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: center;
        transition: 0.2s;
      }
      h3 {
        font-weight: 700;
        padding: 16px 20px;
        line-height: 140%;
      }
      p {
        @include flexCenter(center, center);
        color: #5b9bd5;
        padding: 0 20px;
      }
      p::before {
        content: "　";
        background-image: url("~@/assets/images/map_icon.png");
        background-size: contain;
        background-repeat: no-repeat;
        margin-bottom: 3px;
      }
    }

    .slider-item:hover {
      transform: translate(-4px, -4px);
      box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.25);
    }
    .slider-item:first-child {
      animation-duration: 0.2s;
    }
    .slider-item:nth-child(2) {
      animation-duration: 0.4s;
    }
    .slider-item:nth-child(3) {
      animation-duration: 0.6s;
    }
    .slider-item:nth-child(4) {
      animation-duration: 0.8s;
    }
  }
  button {
    @include flexCenter(center, center);
    @include size(40px, 40px);
    position: absolute;
    background-color: #d69f8f;
    border-radius: 50px;
    border: none;
    cursor: pointer;
  }
  .btn_next {
    right: -8%;
  }
  .btn_back {
    left: -8%;
  }
  .btn_next::after,
  .btn_back::after {
    @include size(12px, 12px);
    position: relative;
    content: "";
    transform: rotate(45deg);
  }
  .btn_next::after {
    border-right: solid 4px #fff;
    border-top: solid 4px #fff;
    right: 2px;
  }
  .btn_back::after {
    border-left: solid 4px #fff;
    border-bottom: solid 4px #fff;
    left: 2px;
  }
}
</style>