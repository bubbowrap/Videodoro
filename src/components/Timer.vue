<template>
  <section>
    <div class="container">
      <div class="columns">
        <div class="column"></div>
        <div class="column is-three-quarters-tablet is-half-desktop timer">
          <div class="buttons is-centered">
            <b-button
              class="is-medium is-active"
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
              )}:${
                seconds % 60 > 10
                  ? Math.floor(seconds % 60)
                  : '0' + Math.floor(seconds % 60)
              }`
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
let initialVal = 0.1 // 6

export default {
  data() {
    return {
      workTime: initialVal,
      shortBreak: 0.03, // 1
      longBreak: 0.09, // 5
      currentCycle: 0,
      cycles: 2,
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
    seconds() {
      if (this.seconds <= 0) {
        clearInterval(this.countdown)
        this.isPaused = true
        // if in work time
        if (this.currentSession === this.workTime) {
          //if complete work time, advance cycle
          this.currentCycle++
          // if less than cycles, do short break else do long break and then reset the cycles
          if (this.currentCycle <= this.cycles) {
            this.currentSession = this.shortBreak
          } else {
            this.currentCycle = 0
            this.currentSession = this.longBreak
          }
        }
        // if on break time
        else if (
          this.currentSession === this.shortBreak ||
          this.currentSession === this.longBreak
        ) {
          this.currentSession = this.workTime
        }
      }
    },
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
      this.isPaused = true
    },

    updateClock(value, e) {
      this.isPaused = true
      clearInterval(this.countdown)
      console.log(e.currentTarget.classList)
      if (value === 'workTime') {
        this.currentSession = this.workTime
        e.currentTarget.classList.remove('is-inverted')
      } else {
        e.currentTarget.classList.add('is-inverted')
      }
      if (value === 'shortBreak') {
        this.currentSession = this.shortBreak
        e.currentTarget.classList.toggle('is-inverted')
      } else {
        e.currentTarget.classList.add('is-inverted')
      }
      if (value === 'longBreak') {
        this.currentSession = this.longBreak
        e.currentTarget.classList.toggle('is-inverted')
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
