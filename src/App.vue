<template>
  <div id="app" class="has-text-centered">
    <Header />
    <Home
      :workTime="workTime"
      :shortBreak="shortBreak"
      :longBreak="longBreak"
      :cycles="cycles"
    />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Home from '@/components/Home.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'App',
  data() {
    return {
      workTime: 25,
      shortBreak: 0.03, // 1
      longBreak: 0.09, // 5
      cycles: 2,
    }
  },
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
