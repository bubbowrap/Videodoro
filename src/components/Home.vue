<template>
  <main>
    <Timer
      :workTime="workTime"
      :shortBreak="shortBreak"
      :longBreak="longBreak"
      :cycles="cycles"
      :autoplay="autoplay"
      v-on:currentSession="updatePhrase"
    />
    <section class="homepage-tagline" ref="taglineText">
      {{
        workPhase === true
          ? workPhrases[Math.floor(Math.random() * workPhrases.length)]
          : breakTime === true
          ? breakPhrases[Math.floor(Math.random() * breakPhrases.length)]
          : defaultPhrase[0]
      }}
    </section>
    <VideoPreview
      :shortBreak="shortBreak"
      :longBreak="longBreak"
      :currentSession="currentSession"
      v-if="(loaded = true)"
      v-on:loadThis="loadVideoCarousel"
    />
  </main>
</template>

<script>
import Timer from '@/components/Timer.vue'
import VideoPreview from '@/components/VideoPreview.vue'

export default {
  props: ['workTime', 'shortBreak', 'longBreak', 'cycles', 'autoplay'],
  data() {
    return {
      loaded: false,
      currentSession: '',
      defaultPhrase: ['Work. Watch. Repeat.'],
      workPhrases: [
        "Let's get it.",
        'A little hard work never hurt anyone.',
        'You got this.',
        "Let's do this.",
        "It's all you.",
        'Believe in the me that believes in you.',
        'Work work work work work work',
      ],
      breakPhrases: [
        'Nice work, you deserve a reward. Pick a video.',
        'Great job. Pick a video, you deserve it.',
        "You've accomplished a lot. Video time!",
        'Whew, you worked hard. Go ahead, watch something.',
      ],
      workPhase: null,
      breakTime: null,
    }
  },
  components: {
    Timer,
    VideoPreview,
  },
  methods: {
    updatePhrase(phrase) {
      phrase === 'workTime' ? (this.workPhase = true) : (this.workPhase = false)
      phrase === 'longBreak' || phrase === 'shortBreak'
        ? (this.breakTime = true)
        : (this.breakTime = false)
      phrase === 'initialLoad'
        ? (this.workPhase = false)
        : (this.breaktTime = false)

      this.currentSession = phrase
    },
    loadVideoCarousel() {
      this.loaded = true
    },
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(20px);
  opacity: 0;
}
</style>
