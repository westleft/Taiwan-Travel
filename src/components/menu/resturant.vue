<script>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    let data = ref({});

    onMounted(async () => {
      await store.dispatch("Data/Resturant/getList");
      data.value = store.getters["Data/Resturant/getData"]
      console.log(data.value);
    });

    return { data };
  },
};
</script>
<template>
  <div class="event">
    <div v-for="item in data.value" :key="item" class="event-item">
      <img
        :src="item.Picture.PictureUrl1"
        :alt="item.Picture.PictureDescription1"
      />
      <div class="detail">
        <h3>{{ item.RestaurantName }}</h3>
        <p><span>時間</span>{{ item.OpenTime }}</p>
        <p><span>地點</span>{{ item.Address }}</p>
        <p>{{item.Description}}</p>
        <a href="./detail/?id=${data[i].ID}">
          <button>活動詳情</button>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.event-item {
  @include flexCenter(space-between, center);
  width: 48%;
  min-height: 320px;
  position: relative;
  background-color: #fff;
  margin: 28px 0;
  animation: img-display ease-out 0.3s;
  img {
    object-fit: cover;
    object-position: center;
    flex: 5.5;
    width: 50%;
  }
  .detail {
    @include flexCenter(flex-start, flex-start);
    flex-direction: column;
    flex: 4.5;
    padding: 20px 16px 60px 16px;
    line-height: 140%;
  }
  h3 {
    font-weight: 700;
    font-size: 20px;
  }
  p {
    margin-top: 12px;
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