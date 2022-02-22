<script>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const data = reactive({
      fullData: [],
      randomData: []
    });
    const state = useStore();

    onMounted(async () => {
      await state.dispatch("Data/Active/getList");
      data.fullData = state.getters["Data/Active/getData"];
      appendToData(data)
    });

    // 取出隨機 4 個放到陣列 (熱門景點)
    const appendToData = (data) => {
      for (let i = 0; i < 4; i++) {
        let number = getRandom(data['fullData'].value.length);
        let item = data['fullData'].value[number]

        data['randomData'].push(item)
      }
    };

    // 產生隨機數
    const getRandom = (x) => {
      return Math.floor(Math.random() * x);
    };

    return { data };
  },
};
</script>
<template>
  <div v-for="item in data.randomData" class="event-item" :key="item">
    <img
      v-if="item.Picture.PictureUrl1"
      :src="item.Picture.PictureUrl1"
      alt=""
    />
    <img v-else src="~@/assets/images/non-image.jpg" alt="" />

    <div class="detail">
      <h3>{{ item.ActivityName }}</h3>
      <p><span>時間</span>{{ item.StartTime }}-{{ item.EndTime }}</p>
      <p><span>地點</span>{{ item.Location }}</p>
      <p>{{ item.Description }}</p>

      <a href="./page/detail/?id=${item.ID}">
        <button>活動詳情</button>
      </a>
    </div>
  </div>
</template>

<style>
</style>