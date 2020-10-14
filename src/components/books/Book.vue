<template>
  <div>
    <img :src="form.image" width="300" alt="img">
    <form>
      <label for="">Editar</label>
      <input type="checkbox" v-model="edit"><br>
      <label for="">Titulo</label>
      <input type="text" v-model="form.title" :disabled="!edit"><br>
      <label for="">Autor</label>
      <input type="text" v-model="form.author" :disabled="!edit"><br>
      <label for="">Imagen</label>
      <input type="text" v-model="form.image" :disabled="!edit"><br>
      <label for="">Tipo</label>
      <select v-model="form.type" :disabled="!edit">
        <option v-for="type in types" :key="type" :value="type">{{type}}</option>
      </select><br>
      <button @click.prevent="editBook" :disabled="!edit">Editar</button>
      <button @click.prevent="destroyBook">Eliminar</button>
    </form>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
export default {
  name: 'book-component',
  props: ['id'],
  data: function(){
    return {
      form:{
        title:"",
        author:"",
        pages:"",
        type:"",
        image:"",
      },
      edit:false
    }
  },
  computed: {
    ...mapGetters(['getBook']),
    ...mapState(['types'])
  },
  methods: {
    // -- Metodos
    async setBook(){
      let book = this.getBook(this.id)
      console.log(book)
      if(book === undefined){
        let resp = await this.fetchIdBook(this.id)
        book = resp.data()
      }

      this.form.title = book.title
      this.form.author = book.author
      this.form.type = book.type
      this.form.image = book.image
      this.form.pages = book.pages
    },
    editBook(){
      let book = this.form
      book.id = this.id

      let response = this.updateBook(book)

      response.then(()=>{
        alert('Libro actualizado')
        this.$router.push("/libros")
      }).catch(error=>{
        console.log(error)
      })
    },
    destroyBook(){
      let res = confirm("¿Estas seguro de querer borrar?")

      if(!res) return //guardia

      this.deleteBook(this.id).then(()=>{
        alert("libro Eliminado");
        this.$router.push("/libros")
      }).catch(error=>{
        console.log(error)
      })
      

    },
    ...mapActions(['fetchIdBook','updateBook','deleteBook'])
  },
  // components: {},
  created(){
    this.setBook();
  }
}
</script>

<style scoped>
  form{
    display:inline-block;
    vertical-align: top;
  }
</style>