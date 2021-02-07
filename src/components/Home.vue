<template>
  <main>
    <Timer
      :workTime="workTime"
      :shortBreak="shortBreak"
      :longBreak="longBreak"
      :cycles="cycles"
    />
    <section class="homepage-tagline">
      Work. Watch. Repeat.
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
      workPhrases: [
        "Let's get it.",
        'A little hard work never hurt anyone.',
        'You got this.',
        "Let's do this.",
        "It's all you.",
      ],
      breakPhrases: [
        'Nice work, you deserve a reward. Pick a video.',
        'Great job. Pick a video, you deserve it.',
      ],
    }
  },
  components: {
    Timer,
    VideoPreview,
  },
}
</script>
