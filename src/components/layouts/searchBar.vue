<script setup lang="ts">
import { apiGetSearch } from "@/api/index";
import { ref, provide, onMounted } from "vue";
const emit = defineEmits(["sendData"])

const searchText = ref<string>("");
const searchData = ref<object>({});

const search = async () => {
  try {
    const res = await apiGetSearch(searchText.value);
    searchData.value = res.data;
    emit("sendData", searchData.value)
    // console.log(data.value);
    
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <div class="search_bar">
    <input
      type="text"
      placeholder="所有縣市"
      @keypress.enter="search"
      v-model="searchText"
    />
  </div>
</template>

<style lang="scss" scoped>
.search_bar {
  @include flexCenter(center, center);
  width: 100%;
  height: 200px;
  background: $color_skin;
  input {
    @include size(56px, 72%);
    position: relative;
    border: none;
    border-radius: 24px;
    padding-left: 52px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 24px;
    color: #bdbdbd;
    transition: 0.1s;
    &:focus {
      border: none;
      outline: #00447c80 solid 4px;
    }
  }
}
</style>