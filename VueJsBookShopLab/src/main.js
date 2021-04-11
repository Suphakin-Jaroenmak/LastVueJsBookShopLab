import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar'

Vue.config.productionTip = false

Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

Vue.prototype.$apiUrl = 'http://127.0.0.1:3000/api/v1/'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
