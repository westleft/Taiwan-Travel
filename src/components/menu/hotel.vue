<script>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    let data = ref({});

    onMounted(async () => {
      await store.dispatch("Data/Hotel/getList");
      data.value = store.getters["Data/Hotel/getData"]
    });

    return { data };
  },
};
</script>
<template>
  <div class="event">
    <div v-for="item in data.value" :key="item" class="event-item">
      <img
        v-if="item.Picture.PictureUrl1"
        :src="item.Picture.PictureUrl1"
        :alt="item.Picture.PictureDescription1"
      />
      <img v-else src="~@/assets/images/non-image.jpg">
      <div class="detail">
        <h3>{{ item.HotelName }}</h3>
        <p><span>時間</span>{{item.StartTime}} - {{item.EndTime}}</p>
        <p><span>地點</span>{{ item.Address }}</p>
        <p>{{item.Description}}</p>
        <a href="./detail/?id=${data[i].ID}">
          <button>活動詳情</button>
        </a>
      </div>
    </div>
  </div>
</template>

<style>

</style>