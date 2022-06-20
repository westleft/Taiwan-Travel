<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const searchText = ref<string>("");

const goSearch = (): void => {
  router.push({ path: `/menu/search`, query: { q: `${searchText.value}` } });
};
</script> 
<template>
  <input
    type="text"
    placeholder="所有縣市"
    @keypress.enter="goSearch"
    v-model="searchText"
  />
</template>

<style lang="scss" scoped>
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
</style>