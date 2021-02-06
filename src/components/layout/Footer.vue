<template>
  <footer>
    Designed + developed by
    <a href="https://www.jeremysamuel.dev" target="_blank" rel="noopener"
      >Jeremy Samuel</a
    >
    with
    <a href="https://www.vuejs.org" target="_blank" rel="noopener">Vue.js</a>
    <strong> · </strong>
    <a href="javascript:void(0)" @click="aboutModalActive = true"
      >About Videodoro</a
    >
    <b-modal v-model="aboutModalActive" :width="640">
      <div class="card modal-card has-text-left">
        <header class="modal-card-head">
          <h2 class="modal-card-title">What is Videodoro?</h2>
          <button
            type="button"
            class="delete"
            @click="aboutModalActive = false"
          />
        </header>
        <div class="card-content">
          <div class="content">
            <p>
              To understand what Videodoro is, you first need to know about the
              Pomodoro technique created by Francesco Cirillo. In ten words or
              less, it’s a more productive way to work and study. You can learn
              more about it here.
            </p>

            <p>
              Full disclosure, the concept for Videodoro was blatantly stolen
              from this video about an idea called Animedoro. Now, I love anime,
              but frankly I don’t always want to watch it. Plus sometimes an
              episode will end on a cliffhanger, and with my level of self
              control I could easily see myself completely ignoring the timer
              and just going on to the next one.
            </p>

            <p>Know where I don’t have that problem? YouTube.</p>

            <p>
              This app was designed in Sketch and built with Vue.js on top of
              the Buefy framework.
              <a href="https://jeremysamuel.dev" target="_blank" rel="noopener"
                >Visit my site</a
              >
              to contact me or see some of my other projects!
            </p>
          </div>
        </div>
      </div>
    </b-modal>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      aboutModalActive: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.modal {
  flex-direction: row;
}
</style>
