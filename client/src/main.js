import Vue from 'vue'
import App from './App.vue'
import router from './router'
import titleMixin from './mixins/titleMixins'
import store from './store/store'
import firebase from 'firebase/app'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.mixin(titleMixin)

const firebaseConfig = {
  apiKey: "AIzaSyDvmKOguUOQXEDv4JpgwfPSh8BxnsVMjOU",
  authDomain: "mevn-market.firebaseapp.com",
  databaseURL: "https://mevn-market-default-rtdb.firebaseio.com",
  projectId: "mevn-market",
  storageBucket: "mevn-market.appspot.com",
  messagingSenderId: "804762201560",
  appId: "1:804762201560:web:a5fe6260389c08046d96ad",
  measurementId: "G-E0M3JVGN81"
}

firebase.initializeApp(firebaseConfig)

router.beforeEach((to, from, next) => {
  const needAuth = to.matched.some(x => x.meta.requiresAuth)
  
  if(needAuth && !firebase.auth().currentUser) {
    next('/login')
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
