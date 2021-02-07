import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
//import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false
Vue.component('homepage-tagline', {
  template:
    '<section class="homepage-tagline" ref="taglineText">Work. Watch. Repeat.</section>',
})
new Vue({
  render: h => h(App),
}).$mount('#app')
