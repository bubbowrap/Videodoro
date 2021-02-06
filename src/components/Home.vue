<template>
  <section>
    <Timer />
    Work. Watch. Repeat.
    <hr />
    <VideoPreview />
  </section>
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
<style scoped lang="scss"></style>
