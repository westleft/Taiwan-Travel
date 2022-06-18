<script setup lang="ts">
import { ref, onMounted, inject, computed } from "vue";
const randmoNumber = ref(<number>0);

const data = inject("data");

onMounted(() => {
  getRandomNumber();
});

// 取得隨機數
const getRandomNumber = (): void => {
  randmoNumber.value = Math.floor(Math.random() * 196);
};
</script>
<template>
  <section>
    <h2>精選活動</h2>
    <div
      v-for="item in data.active.slice(randmoNumber, randmoNumber + 4)"
      class="event-item"
      :key="item"
    >
      <img
        v-if="item.Picture.PictureUrl1"
        :src="item.Picture.PictureUrl1"
        :alt="item.Picture.PictureDescription1"
      />
      <img v-else src="@/assets/images/non-image.jpg" />

      <div class="detail">
        <h3>{{ item.ActivityName }}</h3>
        <p>
          <span>時間</span>
          {{ item.StartTime.slice(0, 10) }}-
          {{ item.EndTime.slice(0, 10) }}
        </p>
        <p><span>地點</span>{{ item.Address }}</p>
        <p>{{ item.Description.slice(0, 28) }} ...</p>
        <router-link :to="`/post/${item.ActivityID}`">
          <button>活動詳情</button>
        </router-link>
      </div>
    </div>
    <div class="read_more_container">
      <router-link to="/menu/scenicSpot" class="more">
        <img src="@/assets/images/ream_more.png" alt="" />
      </router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  @include flexCenter(center, space-between);
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
  padding-top: 20px;
  .read_more_container {
    @include flexCenter(center, flex-end);
    width: 100%;
    padding: 28px 0 8px 0;
  }
  h2 {
    @include flexCenter(center, center);
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    padding: 16px 0;
  }
  h2::before {
    @include flexCenter(center, center);
    @include size(60px, 44px);
    content: "";
    background-image: url("~@/assets/images/event_icon.png");
    margin-right: 12px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.event-item {
  @include flexCenter(space-between, center);
  @include size(350px, 48%);
  min-height: 350px;
  position: relative;
  background-color: #fff;
  margin-top: 28px;
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