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
                seconds % 60 >= 10
                  ? Math.floor(seconds % 60)
                  : '0' + Math.floor(seconds % 60)
              }`
            }}
          </div>

          <audio id="sessionComplete" ref="sessionComplete">
            <source
              src="@/assets/audio/lift_arrive_beep.mp3"
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>

          <div class="timer-controls buttons is-centered">
            <b-button
              type="is-black"
              size="is-xlarge"
              class="button-start"
              @click="startInterval"
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
import { EventBus } from './../main'

export default {
  props: ['workTime', 'shortBreak', 'longBreak', 'cycles'],
  data() {
    return {
      currentCycle: 0,
      isPaused: true,
      countdown: 0,
      seconds: 0,
      currentSessionDuration: 0,
    }
  },
  watch: {
    currentSessionDuration() {
      this.seconds = this.currentSessionDuration * 60
    },
    //When seconds reach zero, do stuff
    seconds() {
      if (this.seconds <= 0) {
        this.$refs.sessionComplete.play()
        clearInterval(this.countdown)
        this.isPaused = true
        // if in work time
        if (this.currentSessionDuration === this.workTime) {
          //if complete work time, advance cycle and update homepage phrase

          this.currentCycle++
          // if less than cycles, do short break else do long break and then reset the cycles
          if (this.currentCycle <= this.cycles) {
            this.$refs.workTimeButton.$el.classList.add('is-inverted')
            this.$refs.sBreakButton.$el.classList.remove('is-inverted')
            this.currentSessionDuration = this.shortBreak
            this.$emit('currentSession', 'shortBreak')
          } else {
            this.currentCycle = 0
            this.$refs.workTimeButton.$el.classList.add('is-inverted')
            this.$refs.lBreakButton.$el.classList.remove('is-inverted')
            this.currentSessionDuration = this.longBreak
            this.$emit('currentSession', 'longBreak')
          }
        }
        // if on break time
        else if (
          this.currentSessionDuration === this.shortBreak ||
          this.currentSessionDuration === this.longBreak
        ) {
          this.$refs.workTimeButton.$el.classList.remove('is-inverted')
          this.$refs.sBreakButton.$el.classList.add('is-inverted')
          this.$refs.lBreakButton.$el.classList.add('is-inverted')
          this.currentSessionDuration = this.workTime
        }
      }
    },
  },
  methods: {
    //starts intervals for pomodoro
    startInterval() {
      this.isPaused = !this.isPaused
      clearInterval(this.countdown)
      //pause logic
      if (!this.isPaused) {
        this.countdown = setInterval(this.decrement, 1000)
      }

      if (this.currentSessionDuration === this.workTime) {
        this.$emit('currentSession', 'workTime')
      } else {
        this.$emit('currentSession', 'break')
      }
    },
    //reset button logic
    resetBtnClick() {
      clearInterval(this.countdown)
      this.seconds = this.currentSessionDuration * 60
      this.isPaused = true
    },
    //updates clock
    updateClock(value) {
      this.isPaused = true
      clearInterval(this.countdown)
      //changes the work/break button status
      if (value === 'workTime') {
        this.currentSessionDuration = this.workTime
        this.$refs.workTimeButton.$el.classList.remove('is-inverted')
        this.$emit('currentSession', 'initialLoad')
      } else {
        this.$refs.workTimeButton.$el.classList.add('is-inverted')
      }
      if (value === 'shortBreak') {
        this.currentSessionDuration = this.shortBreak
        this.$refs.sBreakButton.$el.classList.remove('is-inverted')
        this.$emit('currentSession', 'shortBreak')
      } else {
        this.$refs.sBreakButton.$el.classList.add('is-inverted')
      }
      if (value === 'longBreak') {
        this.currentSessionDuration = this.longBreak
        this.$refs.lBreakButton.$el.classList.remove('is-inverted')
        this.$emit('currentSession', 'longBreak')
      } else {
        this.$refs.lBreakButton.$el.classList.add('is-inverted')
      }
    },
    //decrements time by one second
    decrement() {
      this.seconds--
    },
  },
  created() {
    this.seconds = this.workTime * 60
    this.currentSessionDuration = this.workTime
    EventBus.$on('fireTimer', () => {
      this.startInterval()
    })
    this.$emit('currentSession', 'initialLoad')
  },
}
</script>
