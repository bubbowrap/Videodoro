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

      <!--Modal  SettingsForm-->
      <b-modal v-model="settingsModalActive" :width="480">
        <div class="card modal-card has-text-left">
          <header class="modal-card-head">
            <h2 class="modal-card-title">
              <b-icon icon="cog" size="is-small" class="mr-1"> </b-icon>
              Videodoro Settings
            </h2>
            <button
              type="button"
              class="delete"
              @click="settingsModalActive = false"
            />
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns is-mobile">
                <div class="column">
                  <b-field label="Pomodoro">
                    <b-input
                      type="number"
                      v-model.number="workTime"
                      placeholder="Enter Work Time"
                    >
                    </b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Short Break">
                    <b-input
                      type="number"
                      v-model.number="shortBreak"
                      placeholder="Enter Short Break Time"
                    >
                    </b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Long Break">
                    <b-input
                      type="number"
                      v-model.number="longBreak"
                      placeholder="Enter Long Break Time"
                    >
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-mobile">
                <div class="column">
                  <b-field label="Pomodoro Cycles">
                    <b-input
                      type="number"
                      v-model.number="cycles"
                      placeholder="Enter Number of Cycles"
                    >
                    </b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Theme Color">
                    <b-field>
                      <b-switch
                        v-model="darkMode"
                        passive-type="is-dark"
                        size="is-medium"
                        type="is-warning"
                        class="mt-1"
                        disabled
                      >
                        {{ darkMode ? 'Light' : 'Dark' }}
                      </b-switch>
                    </b-field>
                  </b-field>
                </div>
              </div>
            </div>
          </div>
          <footer class="modal-card-foot buttons is-centered">
            <b-button
              label="Save Settings"
              @click="saveVars"
              type="is-black"
              size="is-large"
            />
          </footer>
        </div>
      </b-modal>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      workTime: 25,
      shortBreak: 5,
      longBreak: 15,
      cycles: 1,
      darkMode: false,
      settingsModalActive: false,
    }
  },
  methods: {
    saveVars() {
      this.settingsModalActive = false
      this.$emit('updateVars', {
        workTime: this.workTime,
        shortBreak: this.shortBreak,
        longBreak: this.longBreak,
        cycles: this.cycles,
        darkMode: this.darkMode,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  flex-direction: row;
}
</style>
