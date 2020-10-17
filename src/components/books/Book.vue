<template>
  <div>
    <h2>{{ form.title }}</h2>
    <b-container class="bv-example-row">
      <b-row>
        <b-col md="12">
          <b-form-checkbox v-model="edit" name="check-button" switch>
            Editar libro
          </b-form-checkbox>
        </b-col>
        <b-col md="4" class="mr-5">
          <img :src="form.image" width="350" alt="img" />
        </b-col>
        <b-col md="6">
          <div>
          <b-form>
            <b-form-group
              id="input-group-1"
              label="Titulo:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.title"
                type="text"
                required
                placeholder="Ingresar Titulo"
                :disabled="!edit"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Autor:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.author"
                required
                placeholder="Ingresar Autor"
                :disabled="!edit"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Url Imagen:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="form.image"
                required
                placeholder="Ingresar url"
                :disabled="!edit"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Paginas:"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                v-model="form.pages"
                required
                placeholder="Ingresar numero paginas"
                :disabled="!edit"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-5" label="Tipo:" label-for="input-5">
              <b-form-select
                id="input-5"
                v-model="form.type"
                :options="types"
                required
                :disabled="!edit"
              ></b-form-select>
            </b-form-group>

           

            <b-button type="submit" variant="primary" @click.prevent="editBook" :disabled="!edit">Editar</b-button>
            <b-button type="reset" variant="danger" @click.prevent="destroyBook">Eliminar</b-button>
          </b-form>
          </div>
        </b-col>
        
      </b-row>
    </b-container>
    <!-- <img :src="form.image" width="300" alt="img">
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
    </form> -->
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "book-component",
  props: ["id"],
  data: function() {
    return {
      form: {
        title: "",
        author: "",
        pages: "",
        type: "",
        image: "",
      },
      edit: false,
    };
  },
  computed: {
    ...mapGetters(["getBook"]),
    ...mapState(["types"]),
  },
  methods: {
    // -- Metodos
    async setBook() {
      let book = this.getBook(this.id);
      console.log(book);
      if (book === undefined) {
        let resp = await this.fetchIdBook(this.id);
        book = resp.data();
      }

      this.form.title = book.title;
      this.form.author = book.author;
      this.form.type = book.type;
      this.form.image = book.image;
      this.form.pages = book.pages;
    },
    editBook() {
      let book = this.form;
      book.id = this.id;

      let response = this.updateBook(book);

      response
        .then(() => {
          alert("Libro actualizado");
          this.$router.push("/libros");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    destroyBook() {
      let res = confirm("¿Estas seguro de querer borrar?");

      if (!res) return; //guardia

      this.deleteBook(this.id)
        .then(() => {
          alert("libro Eliminado");
          this.$router.push("/libros");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ...mapActions(["fetchIdBook", "updateBook", "deleteBook"]),
  },
  // components: {},
  created() {
    this.setBook();
  },
};
</script>

<style scoped>
/* form {
  display: inline-block;
  vertical-align: top;
} */
</style>
