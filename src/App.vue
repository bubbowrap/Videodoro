<template>
  <div id="app" class="has-text-centered" :class="{ 'theme--dark': darkMode }">
    <Header v-on:updateVars="updateVars" />
    <Home
      :workTime="workTime"
      :shortBreak="shortBreak"
      :longBreak="longBreak"
      :cycles="cycles"
      :autoplay="autoplay"
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
      autoplay: true,
      darkMode: true,
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
      this.autoplay = formVars.autoplay
      this.darkMode = formVars.darkMode
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
      this.autoplay = this.pomodoroSettings.autoplay
      this.darkMode = this.pomodoroSettings.darkMode
    } else {
      this.pomodoroSettings = {}
    }
  },
}
</script>

<style lang="scss">
@import '@/sass/videodoro.scss';
</style>
