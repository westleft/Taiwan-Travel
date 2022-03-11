<script>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const isload = ref(true);
    const store = useStore();

    const data = computed(() => {
      return store.state.data.active;
    });

    // 取出隨機 4 個放到陣列 (熱門景點)
    const appendToData = () => {
      // for (let i = 0; i < 4; i++) {
      //   let number = getRandom(data["fullData"].length);
      //   let item = data["fullData"][number];
      //   data["randomData"].push(item);
      // }
    };

    // 產生隨機數
    const getRandom = (x) => {
      return Math.floor(Math.random() * x);
    };
    // randomData
    return { data };
  },
};
</script>
<template>
  <div v-for="item in data" class="event-item" :key="item">
    <img v-if="item.picture" :src="item.picture" alt="" />
    <img v-else src="~@/assets/images/non-image.jpg" />

    <div class="detail">
      <h3>{{ item.name }}</h3>
      <p><span>時間</span>{{ item.startTime }}-{{ item.endTime }}</p>
      <p><span>地點</span>{{ item.city }}</p>
      <p>{{ item.description }}</p>

      <a href="/">
        <button>活動詳情</button>
      </a>
    </div>
  </div>
</template>

<style>
</style>