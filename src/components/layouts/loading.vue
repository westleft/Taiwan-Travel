<script setup>

</script>
<template>
  <Transition name="fade">
    <div id="loading" v-if="isShow">
      <img src="@/assets/images/bus.png" alt="" />
      <p>LOADING</p>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
#loading {
  @include flexCenter(center, center);
  @include size(100vh, 100vw);
  flex-direction: column;
  background-color: #e8d4a2;
  position: fixed;
  z-index: 5;
  img {
    width: 20%;
    max-width: 160px;
  }
  p {
    color: #fff;
    margin-top: 20px;
    font-size: 1vw;
  }
}
.fade-enter-active {
  transition: all 1s ease-in-out;
}
.fade-leave-active {
  transition: all 1s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(100vh);
  opacity: 0;
}
</style>