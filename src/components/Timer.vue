<template>
  <section>
    <div class="container">
      <div class="columns">
        <div class="column"></div>
        <div class="column is-three-quarters-tablet is-half-desktop timer">
          <div class="buttons is-centered">
            <b-button
              class="is-medium is-black"
              @click="updateClock('workTime', $event)"
              >Pomodoro</b-button
            >
            <b-button
              class="is-medium is-dark is-inverted"
              @click="updateClock('shortBreak', $event)"
            >
              Short Break</b-button
            >
            <b-button
              class="is-medium is-dark is-inverted"
              @click="updateClock('longBreak', $event)"
              >Long Break</b-button
            >
          </div>
          <div class="timer-digits">
            {{
              `${Math.floor(
                seconds / 60 > 10 ? seconds / 60 : '0' + seconds / 60
              )}:${seconds % 60 > 10 ? seconds % 60 : '0' + (seconds % 60)}`
            }}
          </div>
          <div class="timer-controls buttons is-centered">
            <b-button
              type="is-black"
              size="is-xlarge"
              class="button-start"
              @click="timerBtnClick"
            >
              {{ isPaused ? 'Start' : 'Pause' }} Timer
            </b-button>
            <b-tooltip label="Reset Timer" position="is-bottom">
              <b-button
                type="is-black"
                icon-right="restart"
                size="is-large"
                class="button-restart"
                @click="resetBtnClick"
                outlined
              >
              </b-button>
            </b-tooltip>
          </div>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </section>
</template>

<script>
let initialVal = 25

export default {
  data() {
    return {
      workTime: initialVal,
      shortBreak: 5,
      longBreak: 15,
      cycles: 1,
      isPaused: true,
      countdown: 0,
      seconds: initialVal * 60,
      currentSession: initialVal,
    }
  },
  watch: {
    currentSession() {
      this.seconds = this.currentSession * 60
    },
    seconds() {},
  },
  methods: {
    timerBtnClick() {
      this.isPaused = !this.isPaused
      clearInterval(this.countdown)

      if (!this.isPaused) {
        this.countdown = setInterval(this.decrement, 1000)
      }
    },
    resetBtnClick() {
      clearInterval(this.countdown)
      this.seconds = this.currentSession * 60
      this.countdown = 0
      this.isPaused = true
      this.isBreak = true
    },

    updateClock(value, e) {
      clearInterval(this.countdown)
      console.log(e.currentTarget.classList)
      if (value == 'workTime') {
        this.currentSession = this.workTime
        e.currentTarget.classList.remove('is-inverted')
      } else {
        e.currentTarget.classList.add('is-inverted')
      }
      if (value == 'shortBreak') {
        this.currentSession = this.shortBreak
        e.currentTarget.classList.remove('is-inverted')
      } else {
        e.currentTarget.classList.add('is-inverted')
      }
      if (value == 'longBreak') {
        this.currentSession = this.longBreak
        e.currentTarget.classList.remove('is-inverted')
      } else {
        e.currentTarget.classList.add('is-inverted')
      }
    },
    decrement() {
      this.seconds--
    },
  },
}
</script>
