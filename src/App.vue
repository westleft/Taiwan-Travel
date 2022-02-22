<script>
import Header from "./components/layouts/header.vue"
import Footer from "./components/layouts/footer.vue"
export default {
  components: {
    Header,
    Footer
  },
  setup(){
    return {}
  }
}
</script>
<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<style lang="scss">

</style>