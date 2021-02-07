<template>
  <main>
    <Timer
      :workTime="workTime"
      :shortBreak="shortBreak"
      :longBreak="longBreak"
      :cycles="cycles"
      v-on:updatePhrase="updatePhrase"
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
    <VideoPreview />
  </main>
</template>

<script>
import Timer from '@/components/Timer.vue'
import VideoPreview from '@/components/VideoPreview.vue'

export default {
  props: ['workTime', 'shortBreak', 'longBreak', 'cycles'],
  data() {
    return {
      defaultPhrase: ['Work. Watch. Repeat.'],
      workPhrases: [
        "Let's get it.",
        'A little hard work never hurt anyone.',
        'You got this.',
        "Let's do this.",
        "It's all you.",
        'Believe in the me that believes in you.',
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
      phrase === 'work' ? (this.workPhase = true) : (this.workPhase = false)
      phrase === 'break' ? (this.breakTime = true) : (this.breakTime = false)
      console.log(this.breakTime)
    },
  },
}
</script>
