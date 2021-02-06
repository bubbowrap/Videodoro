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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.homepage-tagline {
  padding: calc(0.5rem + 1vh) 0;
  font-size: 1.85rem;

  @media screen and (min-width: 599px) {
    padding: calc(1vh) 0 calc(1rem + 1vh);
  }
}
</style>
