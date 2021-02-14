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
      workTime: 25,
      shortBreak: 5,
      longBreak: 15,
      cycles: 2,
      refreshKey: 0,
      pomodoroSettings: {},
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
  created() {
    if (localStorage.getItem('pomodoroSettings')) {
      this.pomodoroSettings = JSON.parse(
        localStorage.getItem('pomodoroSettings')
      )
      this.workTime = this.pomodoroSettings.workTime
      this.shortBreak = this.pomodoroSettings.shortBreak
      this.longBreak = this.pomodoroSettings.longBreak
      this.cycles = this.pomodoroSettings.cycles
    } else {
      this.pomodoroSettings = {}
    }
  },
}
</script>

<style lang="scss">
@import '@/sass/videodoro.scss';
</style>
