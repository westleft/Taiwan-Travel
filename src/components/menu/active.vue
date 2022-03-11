<script>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const number = ref(0);
    const isActive = ref(0);
    let data = ref({});
    let pageData = ref({});
    let btn = ref(0);

    console.log(store.getters.getActiveList)

    onMounted(async () => {
      // await store.dispatch("Data/Active/getList");
      // data.value = store.getters["Data/Active/getData"];
      // editData(1);

      // btn.value = btnLength(data.value);
    });

    const btnLength = (data) => {
      // return data.length / 10;
    };

    // 取得分頁數字
    const getNumber = (num) => {
      // editData(num);
      // number.value = num
    };

    // 用分頁數字拿10筆資料
    const editData = (num) => {
      // pageData.value = data.value.slice(num, num + 10);
    };

    return { pageData, btn, getNumber, number };
  },
};
</script>
<template>
  <div class="event">
    <!-- <div v-for="item in pageData" :key="item" class="event-item">
      <img
        v-if="item.Picture.PictureUrl1"
        :src="item.Picture.PictureUrl1"
        :alt="item.Picture.PictureDescription1"
      />
      <img v-else src="~@/assets/images/non-image.jpg" />
      <div class="detail">
        <h3>{{ item.ActivityName }}</h3>
        <p><span>時間</span>{{ item.StartTime }} - {{ item.EndTime }}</p>
        <p><span>地點</span>{{ item.Location }}</p>
        <p>{{ item.Description }}</p>
        <a href="./detail/?id=${data[i].ID}">
          <button>活動詳情 </button>
        </a>
      </div>
    </div> -->
  </div>
  <div class="btns">
    <!-- <button
      v-for="(index, item) in btn"
      :key="item"
      @click="getNumber(index)"
      :class="{btn_select: index == number}"
    >
      {{ index }}
    </button> -->
  </div>
</template>

<style>
</style>