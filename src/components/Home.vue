<template>
  <main>
    <Timer />
    <section class="homepage-tagline">
      <div class="container">
        Work. Watch. Repeat.
      </div>
    </section>
    <VideoPreview />
  </main>
</template>

<script>
import Timer from '@/components/Timer.vue'
import VideoPreview from '@/components/VideoPreview.vue'

export default {
  components: {
    Timer,
    VideoPreview,
  },
}
</script>
