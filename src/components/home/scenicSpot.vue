<script>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const data = computed(() => {
      if (store.state.isload === true) {
        return store.getters.getScenicSpotList;
      }
    });

    const sliderData = reactive({ list: {} });
    const index = ref(0);

    const resController = (operation) => {
      // 判斷要增加還減少
      operation === "+" ? index.value += 4 :index.value -= 4

      // 判斷是否大於或小於原本的 data 長度
      if(index.value < 0){
        index.value = data.value.length -4
      }else if(index.value >= data.value.length){
        index.value = 0
      }

      sliderData.list = data.value.slice(index.value, index.value + 4);
    };

    onMounted(()=>{
      if(store.state.isload === true){
        resController("+")
      }
    })

    watch(
      () => store.state.isload,
      (newValue) => {
        if(newValue === true || data.value !== {}){
          resController("+")
        }
      }
    );

    return { resController, sliderData };
  },
};
</script>
<template>
  <h2>熱門景點</h2>
  <div class="slider">
    <a v-for="item in sliderData.list" :key="item" class="slider-item" href="">
      <img
        v-if="item.prcture"
        :src="item.prcture"
        alt=""
      />
      <img v-else src="~@/assets/images/non-image.jpg" alt="" />
      <h3>{{ item.name }}</h3>
      <p>{{ item.city }}</p>
    </a>
  </div>
  <button @click="resController('+')" class="attr_next btn_next"></button>
  <button @click="resController('-')" class="attr_back btn_back"></button>
  <router-link to="/menu/scenicSpot" class="more">
    More
  </router-link>
</template>

<style lang="scss">
.attractions {
  @include flexCenter(center, center);
  position: relative;
  flex-direction: column;
  width: 100%;
  margin-bottom: 60px;
  h2 {
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 40px;
  }
  h2::before {
    content: "　";
    background-image: url("~@/assets/images/attractions_icon.png");
    padding: 12px;
    margin-right: 12px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .slider {
    @include flexCenter(center, space-between);
    flex-wrap: wrap;
    position: relative;
    width: 76%;
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
    right: 8%;
  }
  .btn_back {
    left: 8%;
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