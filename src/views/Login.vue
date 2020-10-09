<template>
  <div>
    <form>
      <h2>Login</h2>
      <label for="">Usuario</label>
      <input type="text" placeholder="Usuario" v-model="user"> <br>
      <label for="">Contraseña</label>
      <input type="password" v-model="pass"> <br>
      <button @click.prevent="login">Acceder</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'component-name',
  // props: {},
  data: function(){
    return {
      user:'',
      pass:'',
    }
  },
  // computed: {},
  methods: {
    // -- Metodos
    login(){
      
      firebase.auth().signInWithEmailAndPassword(this.user, this.pass)
        .then((resp)=>{
          console.log(resp,'result')
          this.$router.push('/home')
        })
        .catch(function(error){
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(erroCode,ErrorMessage)
        })
    }
  },
  // components: {},
}
</script>

<style scoped>
  
</style>