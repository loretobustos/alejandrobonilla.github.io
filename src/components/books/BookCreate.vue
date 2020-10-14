<template>
  <div>
    <img :src="form.image" width="300" alt="img">
    <form>
      <label for="">Titulo</label>
      <input type="text" v-model="form.title"><br>
      <label for="">Autor</label>
      <input type="text" v-model="form.author"><br>
      <label for="">Imagen</label>
      <input type="text" v-model="form.image"><br>
      <label for="">Tipo</label>
      <select v-model="form.type">
        <option v-for="type in types" :key="type" :value="type">{{type}}</option>
      </select><br>
      <button @click.prevent="createBook">Agregar</button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'book-create',
  // props: {},
  data: function(){
    return {
      form:{
        title:"",
        author:"",
        pages:"",
        type:"",
        image:"",
      },
    }
  },
  computed: {
    ...mapState(['types'])
  },
  methods: {
    // -- Metodos
    createBook(){
      this.addBook(this.form).then(()=>{
        alert('libro creado')
        this.$router.push('/libros')
      }).catch(error=>{
        console.log(error)
      })

    
        
    },
    ...mapActions(['addBook'])
  },
  // components: {},
}
</script>

<style scoped>
  
</style>