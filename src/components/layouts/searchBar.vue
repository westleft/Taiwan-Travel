<script setup>
import { apiGetSearch } from "@/api/request.js"
import { ref, provide } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const emit = defineEmits(["getData"])

const data = ref()

const getData = async () => {
  try {
    const res = await apiGetSearch("花蓮")
    data.value = res.data
    console.log(data.value)
    emit("getData", data)
    router.push("/menu/search")
  } catch (err) {
    // console.log(err)
  }
}

const send = () => {
    getData()
}

</script>
<template>
  <div class="search_bar">
    <input type="text" placeholder="所有縣市" @keypress.enter="send"/>
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