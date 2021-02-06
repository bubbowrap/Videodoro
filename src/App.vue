<template>
  <div id="app" class="has-text-centered">
    <Header />
    <Home />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Home from '@/components/Home.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    Home,
    Header,
    Footer,
  },
}
</script>

<style lang="scss">
@import '@/sass/videodoro.scss';
</style>
