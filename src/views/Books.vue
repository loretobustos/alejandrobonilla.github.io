<template>
  <div>
    <h1>Libros</h1>
    <b-container class="bv-example-row">
      <b-row>
        <b-col md="4"  v-for="book in books" :key="book.id">
          <b-card
            :title="book.title"
            :img-src="book.image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 400px;"
            class="mb-2"
          >
            

            <b-button href="#" variant="primary" @click="redirect(book.id)">Ver descripción</b-button>
          </b-card>
        </b-col>
        <b-col>2 of 3</b-col>
        <b-col>3 of 3</b-col>
      </b-row>
    </b-container>
    <!-- <ul>
      <li v-for="book in books" :key="book.id" class="book">
        <img :src="book.image" width="200" alt="img"><br>
        <span>Titulo: <router-link :to="`/libros/${book.id}`">{{book.title}}</router-link></span>
      </li>
    </ul> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "books-gallery",
  // props: {},
  data: function() {
    return {};
  },
  computed: {
    ...mapState(["books"]),
  },
  methods: {
    // -- Metodos
    redirect(book_id){
      this.$router.push(`/libros/${book_id}`)
    },
    ...mapActions(["fetchBooks"]),
  },
  // components: {},
  created() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
li {
  display: block;
}

.book {
  display: inline-block;
  width: 200px;
  padding: 20px;
}

  .card-img-top{
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>
