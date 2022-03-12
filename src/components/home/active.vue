<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const isload = ref(true);
    const store = useStore();

    const randomData = computed(() => {
      if (store.state.isload === true) {
        const data = [...store.getters.getScenicSpotList];
        const ran = [];
        // 取出隨機 4 個放到陣列 (熱門景點)
        for (let i = 0; i < 4; i++) {
          let number = getRandom(data.length);
          ran.push(data[number]);
        }
        return ran;
      }
    });

    // 產生隨機數
    const getRandom = (x) => {
      return Math.floor(Math.random() * x);
    };

    return { randomData };
  },
};
</script>
<template>
  <div v-for="item in randomData" class="event-item" :key="item">
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