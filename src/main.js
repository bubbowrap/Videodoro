import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
const moment = require('moment')

Vue.use(require('vue-moment'), {
  moment,
})

Vue.use(Buefy)

Vue.config.productionTip = false

export const EventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
