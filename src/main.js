import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {firebaseApp} from './firebase/firebaseInit.js'

Vue.config.productionTip = false


// Initialize Firebase
const firebase = firebaseApp

firebase.auth().onAuthStateChanged(function(){
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})


