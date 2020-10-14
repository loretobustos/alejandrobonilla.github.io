<template>
  <div>
    <h1>Libros</h1>
    <ul>
      <li v-for="book in books" :key="book.id" class="book">
        <img :src="book.image" width="200" alt="img"><br>
        <span>Titulo: <router-link :to="`/libros/${book.id}`">{{book.title}}</router-link></span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'books-gallery',
  // props: {},
  data: function(){
    return {

    }
  },
  computed: {
    ...mapState(['books'])
  },
  methods: {
    // -- Metodos
    ...mapActions(['fetchBooks'])
  },
  // components: {},
  created(){
    this.fetchBooks();
  }
}
</script>

<style scoped>
  li{
    display:block;
  }

  .book{
    display:inline-block;
    width: 200px;
    padding: 20px;
  }
</style>