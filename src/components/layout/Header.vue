<template>
  <b-navbar wrapper-class="container" :mobile-burger="false">
    <template #brand>
      <b-navbar-item tag="h1">
        Videodoro
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            type="is-black"
            icon-left="cog"
            inverted
            size="is-large"
            class="button-settings is-medium-mobile"
            @click="settingsModalActive = true"
          >
            Settings
          </b-button>
        </div>
      </b-navbar-item>

      <b-modal v-model="settingsModalActive" :width="640">
        <div class="card modal-card has-text-left">
          <header class="modal-card-head">
            <h2 class="modal-card-title">Timer Settings</h2>
            <button
              type="button"
              class="delete"
              @click="settingsModalActive = false"
            />
          </header>
          <div class="card-content">
            <div class="content"></div>
          </div>
        </div>
      </b-modal>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      settingsModalActive: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.modal {
  flex-direction: row;
}
</style>
