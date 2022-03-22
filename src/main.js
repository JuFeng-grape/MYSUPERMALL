import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from "@/components/common/toast";
import fastClick from 'fastClick'
import lazy from "vue-lazyload/src/lazy";
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
Vue.use(toast)
fastClick.attach(document.body)
Vue.use(lazy,{
  loading: require('./assets/img/common/placeholder.png')
})
// Vue.prototype.$toast=toast
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
