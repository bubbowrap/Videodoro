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
                @click="resetTimer"
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
  props: ['workTime', 'shortBreak', 'longBreak', 'cycles', 'autoplay'],
  data() {
    return {
      currentCycle: 0,
      isPaused: true,
      countdown: 0,
      seconds: this[this.currentSession] * 60,
      currentSessionDuration: 0,
      currentSession: 'workTime',
    }
  },
  watch: {
    currentSession() {
      // watches current session and updates seconds based on session
      this.seconds = this[this.currentSession] * 60
    },
    //When seconds reach zero, do stuff
    seconds() {
      if (this.seconds <= 0) {
        this.$refs.sessionComplete.play()
        clearInterval(this.countdown)
        this.isPaused = true

        // if in work time
        if (this.currentSession === 'workTime') {
          //if complete work time, advance cycle and update homepage phrase
          this.currentCycle++
          // if less than cycles, do short break else do long break and then reset the cycles
          if (this.currentCycle <= this.cycles) {
            this.$refs.workTimeButton.$el.classList.add('is-inverted')
            this.$refs.sBreakButton.$el.classList.remove('is-inverted')
            this.currentSession = 'shortBreak'
            this.$emit('currentSession', this.currentSession)
          } else {
            this.currentCycle = 0
            this.$refs.workTimeButton.$el.classList.add('is-inverted')
            this.$refs.lBreakButton.$el.classList.remove('is-inverted')
            this.currentSession = 'longBreak'
            this.$emit('currentSession', this.currentSession)
          }
        }
        // if on break time
        else if (
          this.currentSession === 'shortBreak' ||
          this.currentSession === 'longBreak'
        ) {
          this.currentSession = 'workTime'
          this.$refs.workTimeButton.$el.classList.remove('is-inverted')
          this.$refs.sBreakButton.$el.classList.add('is-inverted')
          this.$refs.lBreakButton.$el.classList.add('is-inverted')
        }
        // if autoplay checked, 
        if (this.autoplay) {
          if (this.currentSession === 'workTime' && this.currentCycle === 0) {
            this.isPaused = true
          } else {
            this.startInterval()
          }
        }
      }
    },
  },
  methods: {
    //starts intervals for pomodoro
    startInterval() {
      this.isPaused = !this.isPaused
      EventBus.$emit('startTimer', !this.isPaused)

      clearInterval(this.countdown)
      //pause logic
      if (!this.isPaused) {
        this.countdown = setInterval(this.decrement, 1000)
        //lets Video Preview know the timer's started
      }

      this.$emit('currentSession', this.currentSession)
    },
    //reset button logic
    resetTimer() {
      clearInterval(this.countdown)
      this.seconds = this[this.currentSession] * 60
      this.isPaused = true
    },
    //updates clock
    updateClock(value) {
      this.resetTimer()
      EventBus.$emit('startTimer', !this.isPaused)

      //changes the work/break button status
      if (value === 'workTime') {
        this.$refs.workTimeButton.$el.classList.remove('is-inverted')
      } else {
        this.$refs.workTimeButton.$el.classList.add('is-inverted')
      }
      if (value === 'shortBreak') {
        this.$refs.sBreakButton.$el.classList.remove('is-inverted')
      } else {
        this.$refs.sBreakButton.$el.classList.add('is-inverted')
      }
      if (value === 'longBreak') {
        this.$refs.lBreakButton.$el.classList.remove('is-inverted')
      } else {
        this.$refs.lBreakButton.$el.classList.add('is-inverted')
      }
      this.$emit('currentSession', value)
      this.currentSession = value
    },
    //decrements time by one second
    decrement() {
      this.seconds--
    },
  },
  created() {
    this.currentSession = 'workTime'
    this.seconds = this[this.currentSession] * 60
    EventBus.$on('fireTimer', () => {
      this.startInterval()
    })
    this.$emit('currentSession', 'initialLoad')
  },
}
</script>
