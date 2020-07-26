import firebase from '~/plugins/firebase'
import {
  firestoreAction
} from 'vuexfire'
// import {
//   createNamespacedHelpers
// } from "vuex";

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
  todos: []
})

export const actions = {
  Init: firestoreAction(({
    bindFirestoreRef
  }) => {
    bindFirestoreRef('todos', todosRef)
  }),
  Add: firestoreAction((context, name) => {
    if (name.trim()) {
      todosRef.add({
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),
  Remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  Toggle: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  })
}

export const getters = {
  orderdTodos: state => {
    return _.sortBy(state.todos, 'created')
  }
}
