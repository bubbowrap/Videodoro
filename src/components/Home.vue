<template>
  <main>
    <Timer />
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
  data() {
    return {
      workPhrases: [
        "Let's get it.",
        'A little hard work never hurt anyone.',
        'You got this.',
        "Let's do this.",
      ],
    }
  },
  components: {
    Timer,
    VideoPreview,
  },
}
</script>
