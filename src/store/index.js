import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '../firebase/firebaseDb'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books:[],
    types:['ciencia ficción','novela'],
  },
  mutations: {
    ADD_BOOK(state,book){
      state.books.push({
        id: book.id,
        title: book.data().title,
        author: book.data().author,
        image: book.data().image,
        type: book.data().type,
        pages: book.data().pages
      })
    },
    RESET_BOOKS(state){
      state.books = []
    }
  },
  actions: {
    fetchBooks({commit}){
      db.collection('books').onSnapshot((snap)=>{
        commit('RESET_BOOKS')
        snap.forEach(doc=>{
          commit('ADD_BOOK', doc)
        })
      })
    },
    fetchIdBook({},id_book){
      return db.collection('books').doc(id_book).get()
    },
    updateBook({},book){
      return db.collection('books').doc(book.id).update(book)
    },
    addBook({},book){
      return db.collection('books').add(book)
    },
    deleteBook({}, id_book){
      return db.collection('books').doc(id_book).delete()
    }
  },
  getters:{
    getBook:(state)=>(id_book)=>{
      return state.books.find(book=>book.id == id_book)
    }
  },
  modules: {
  }
})
