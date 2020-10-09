import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyD386-dHkVjX_a0qWHScLb7r41STdzukNk",
  authDomain: "m5clase1.firebaseapp.com",
  databaseURL: "https://m5clase1.firebaseio.com",
  projectId: "m5clase1",
  storageBucket: "m5clase1.appspot.com",
  messagingSenderId: "918337409150",
  appId: "1:918337409150:web:a3459cdfaa8f624ca7882f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(){
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})


