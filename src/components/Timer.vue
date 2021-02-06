<template>
  <section>
    <div class="container">
      <div class="columns">
        <div class="column"></div>
        <div class="column is-three-quarters-tablet is-half-desktop timer">
          <div class="buttons is-centered">
            <b-button type="is-black" size="is-medium">Pomodoro</b-button>
            <b-button type="is-dark" size="is-medium" inverted>
              Short Break</b-button
            >
            <b-button type="is-dark" size="is-medium" inverted
              >Long Break</b-button
            >
          </div>
          <div class="timer-digits">25:00</div>
          <div class="timer-controls buttons is-centered">
            <b-button type="is-black" size="is-xlarge" class="button-start">
              Start Timer
            </b-button>
            <b-tooltip label="Reset Timer" position="is-bottom">
              <b-button
                type="is-black"
                icon-right="restart"
                size="is-large"
                class="button-restart"
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
export default {}
</script>
