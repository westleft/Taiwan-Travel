
<script>
import { onMounted } from "vue"
import { useStore } from "vuex";
export default {
  setup(){
    const store = useStore();

    onMounted(() => {
      store.dispatch("callAllApi");
    });
  }
};
</script>
<template>
  <div class="navbar">
    <router-link to="/">
        <img src="~@/assets/images/logo.png" alt="" class="logo" />
    </router-link>

    <ul>
        <li>
            <router-link to="/menu/active">精選活動</router-link>
        </li>
        <li>
            <router-link to="/menu/scenicSpot">全台景點</router-link>
        </li>
        <li>
            <router-link to="/menu/resturant">探索美食</router-link>
        </li>
        <li>
            <router-link to="/menu/hotel">住宿飯店</router-link>
        </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
html,
body {
  width: 100%;
  font-family: Noto Sans TC;
}

.navbar {
  @include flexCenter(center, space-between);
  width: 100%;
  height: 80px;
  padding: 0 12%;
  background-color: #00457c;
  .logo {
    width: 80%;
  }
  ul {
    @include flexCenter(center, center);
    li {
      @include flexCenter(center, center);
      padding: 0 12px;
      a {
        text-decoration: none;
        font-size: 2.3vmin;
        color: #ffffff;
      }
    }
  }
}
</style>
