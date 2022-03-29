<script setup>
import { apiGetSearch } from "@/api/request.js";
import { ref, provide } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex"


const router = useRouter();
const emit = defineEmits(["getData"]);
const store = useStore();

const searchText = ref();
const data = ref();

// const getData = async () => {
//   try {
//     console.log(searchText.value)
//     const res = await apiGetSearch(searchText.value);
//     const data = res.data.map((item) => {
//       return {
//         id: item.ScenicSpotID,
//         name: item.ScenicSpotName,
//         description: item.Description ? item.Description.slice(0, 20) : "",
//         city: item.City ? item.City : "無提供地點",
//         picture: item.Picture !== {} ? item.Picture.PictureUrl1 : "0",
//         startTime: item.StartTime ? "" : "",
//         endTime: item.EndTime ? "" : "",
//       };
//     });
//     emit("getData", data);
//     router.push("/menu/search");
//   } catch (err) {
//     console.log(err);
//   }
// };

const send = () => {
  store.dispatch("Search/search", searchText.value)
  router.push("/menu/search");
};
</script>
<template>
  <div class="search_bar">
    <input
      type="text"
      placeholder="所有縣市"
      @keypress.enter="send"
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