<template>
  <section>
    <div class="container">
      <div class="columns">
        <div class="column"></div>
        <div class="column is-three-quarters-tablet is-half-desktop timer">
          <div class="buttons is-centered">
            <b-button
              ref="workTimeButton"
              class="is-medium is-dark is-black"
              @click="updateClock('workTime')"
              >Pomodoro</b-button
            >
            <b-button
              ref="sBreakButton"
              class="is-medium is-dark is-black is-inverted"
              @click="updateClock('shortBreak')"
            >
              Short Break</b-button
            >
            <b-button
              ref="lBreakButton"
              class="is-medium is-dark is-black is-inverted"
              @click="updateClock('longBreak')"
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
export default {
  props: ['workTime', 'shortBreak', 'longBreak', 'cycles'],
  data() {
    return {
      currentCycle: 0,
      isPaused: true,
      countdown: 0,
      seconds: 0,
      currentSession: 0,
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
          this.$emit('updatePhrase', 'break')

          this.currentCycle++
          // if less than cycles, do short break else do long break and then reset the cycles
          if (this.currentCycle <= this.cycles) {
            this.$refs.workTimeButton.$el.classList.add('is-inverted')
            this.$refs.sBreakButton.$el.classList.remove('is-inverted')

            this.currentSession = this.shortBreak
          } else {
            this.currentCycle = 0
            this.$refs.workTimeButton.$el.classList.add('is-inverted')
            this.$refs.lBreakButton.$el.classList.remove('is-inverted')
            this.currentSession = this.longBreak
          }
        }
        // if on break time
        else if (
          this.currentSession === this.shortBreak ||
          this.currentSession === this.longBreak
        ) {
          this.$refs.workTimeButton.$el.classList.remove('is-inverted')
          this.$refs.sBreakButton.$el.classList.add('is-inverted')
          this.$refs.lBreakButton.$el.classList.add('is-inverted')

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

      if (this.currentSession === this.workTime) {
        this.$emit('updatePhrase', 'work')
      } else {
        this.$emit('updatePhrase', 'break')
      }
    },

    resetBtnClick() {
      clearInterval(this.countdown)
      this.seconds = this.currentSession * 60
      this.isPaused = true
    },

    updateClock(value) {
      this.isPaused = true
      clearInterval(this.countdown)

      if (value === 'workTime') {
        this.currentSession = this.workTime
        this.$refs.workTimeButton.$el.classList.remove('is-inverted')
      } else {
        this.$refs.workTimeButton.$el.classList.add('is-inverted')
      }
      if (value === 'shortBreak') {
        this.currentSession = this.shortBreak
        this.$refs.sBreakButton.$el.classList.remove('is-inverted')
      } else {
        this.$refs.sBreakButton.$el.classList.add('is-inverted')
      }
      if (value === 'longBreak') {
        this.currentSession = this.longBreak
        this.$refs.lBreakButton.$el.classList.remove('is-inverted')
      } else {
        this.$refs.lBreakButton.$el.classList.add('is-inverted')
      }
    },

    decrement() {
      this.seconds--
    },
  },
  created() {
    this.seconds = this.workTime * 60
    this.currentSession = this.workTime
  },
}
</script>
