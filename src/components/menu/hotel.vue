<script setup lang="ts">
import { inject } from "vue";

const data = inject<object>("data");
const pageIndex = inject<number>("pageIndex");
</script>
<template>
  <div
    v-for="item in data.hotel.slice(pageIndex, pageIndex + 10)"
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
      <h3>{{ item.HotelName }}</h3>
      <p><span>地點</span>{{ item.Address ? item.Address : "尚無資訊" }}</p>
      <p>{{ item.Description.slice(0, 40) }}
        <span v-if="item.Description.length > 40">...</span>
      </p>

      <router-link :to="`/post/${item.id}`">
        <button>活動詳情</button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>