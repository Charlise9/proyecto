import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueHeadful from 'vue-headful'
/* import moment from 'moment' */

Vue.component('vue-headful', vueHeadful);

Vue.config.productionTip = false
/* Vue.use(moment) */

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
