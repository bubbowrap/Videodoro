<template>
  <div id="app" class="has-text-centered">
    <Header v-on:updateVars="updateVars" />
    <Home
      :workTime="workTime"
      :shortBreak="shortBreak"
      :longBreak="longBreak"
      :cycles="cycles"
      :key="refreshKey"
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
      workTime: .03,
      shortBreak: 5, // 1
      longBreak: 15, // 5
      cycles: 2,
      refreshKey: 0,
    }
  },
  components: {
    Home,
    Header,
    Footer,
  },
  methods: {
    updateVars(formVars) {
      this.workTime = formVars.workTime
      this.shortBreak = formVars.shortBreak
      this.longBreak = formVars.longBreak
      this.cycles = formVars.cycles
      this.refreshKey = Math.floor(Math.random() * 10)
    },
  },
}
</script>

<style lang="scss">
@import '@/sass/videodoro.scss';
</style>
