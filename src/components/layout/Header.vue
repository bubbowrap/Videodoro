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
                      :min="1"
                      :max="250"
                      v-model.number="workTime"
                      placeholder="ex. 25"
                    >
                    </b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Short Break">
                    <b-input
                      type="number"
                      :min="1"
                      :max="250"
                      v-model.number="shortBreak"
                      placeholder="ex. 5"
                    >
                    </b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Long Break">
                    <b-input
                      type="number"
                      :min="1"
                      :max="250"
                      v-model.number="longBreak"
                      placeholder="ex. 15"
                    >
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-mobile">
                <div class="column">
                  <b-field label="Cycles">
                    <b-input
                      type="number"
                      :max="250"
                      v-model.number="cycles"
                      placeholder="ex. 1"
                    >
                    </b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Autoplay">
                    <b-field>
                      <b-switch
                        v-model="autoplay"
                        size="is-medium"
                        type="is-success"
                        class="mt-1"
                      >
                        {{ autoplay ? true : false }}
                      </b-switch>
                    </b-field>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Theme">
                    <b-field>
                      <b-switch
                        v-model="darkMode"
                        size="is-medium"
                        type="is-info"
                        class="mt-1"
                      >
                        {{ darkMode ? 'Dark' : 'Light' }}
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
      autoplay: true,
      darkMode: true,
      settingsModalActive: false,
      pomodoroSettings: {},
    }
  },
  methods: {
    saveVars() {
      this.settingsModalActive = false
      this.pomodoroSettings = {
        workTime: this.workTime,
        shortBreak: this.shortBreak,
        longBreak: this.longBreak,
        cycles: this.cycles,
        autoplay: this.autoplay,
        darkMode: this.darkMode,
      }

      localStorage.setItem(
        'pomodoroSettings',
        JSON.stringify(this.pomodoroSettings)
      )

      this.$emit('updateVars', this.pomodoroSettings)
    },
  },
  created() {
    if (localStorage.getItem('pomodoroSettings')) {
      this.pomodoroSettings = JSON.parse(
        localStorage.getItem('pomodoroSettings')
      )
      this.workTime = this.pomodoroSettings.workTime
      this.shortBreak = this.pomodoroSettings.shortBreak
      this.longBreak = this.pomodoroSettings.longBreak
      this.cycles = this.pomodoroSettings.cycles
      this.autoplay = this.pomodoroSettings.autoplay
      this.darkMode = this.pomodoroSettings.darkMode
    }
  },
}
</script>

<style lang="scss" scoped>
.modal {
  flex-direction: row;
}
</style>
