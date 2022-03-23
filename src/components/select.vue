<script setup>
import { reactive, ref } from "vue";
const isShow = ref(false);
const inputValue = ref();

const list = reactive(["熱門活動", "近期活動", "傳統節慶", "原住民活動"]);

const handShow = () => {
  isShow.value = !isShow.value;
};

const selectItem = (item) => {
  inputValue.value = item;
};
</script>

<template>
  <div id="select">
    <div class="container" @click="handShow">
      <img v-show="!isShow" class="select_icon" src="@/assets/images/select_icon.png" alt="" />
      <input
        type="text"
        readonly
        placeholder="主題探索"
        :class="{ selected: !isShow }"
        :value="inputValue"
      />
      <img class="arrow_icon" src="@/assets/images/input_arrow.png" alt="" />
    </div>
    <ul v-if="isShow">
      <li
        v-for="item in list"
        :key="item"
        @click="selectItem(item), handShow()"
      >
        <p>{{ item }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
#select {
  @include flexCenter(center, flex-start);
  width: 150px;
  flex-direction: column;
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  .container {
    @include flexCenter(center, center);
    position: relative;
    width: 100%;
    height: 100%;
    input {
      width: 100%;
      height: 100%;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 24px 24px 0 0;
      padding: 16px 40px;
      color: #000000;
      border: none;
      box-sizing: border-box;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
    .selected {
      border-radius: 24px !important;
    }
    img.select_icon {
      position: absolute;
      width: 20px;
      left: 12px;
      cursor: pointer;
    }
    img.arrow_icon {
      position: absolute;
      width: 20px;
      right: 12px;
      cursor: pointer;
    }
  }
  ul {
    @include flexCenter(center, center);
    flex-direction: column;
    position: absolute;
    width: 100%;
    top: 46px;
    z-index: 3;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0 0 24px 24px;
    overflow: hidden;
    li {
      transition: 0.2s;
      width: 100%;
      cursor: pointer;
      &:hover {
        background-color: rgb(235, 235, 235);
      }
    }
  }
}
</style>