import firebase from '~/plugins/firebase'
import {
  firestoreAction,
  firebaseAction
} from 'vuexfire'

const db = firebase.firestore();
const todosRef = db.collection('todos')

export const state = () => ({
  todos: []
})

export const actions = {
  init: firestoreAction(({
    bindFirestoreRef
  }) => {
    bindFirestoreRef('todos', todosRef)
  }),
  add: firebaseAction((context, name) => {
    if (name.trim()) {
      todosRef.add({
        name: name,
        done: false,
        created: firebase.firestore.FialdValue.serverTimestamp()
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  toggle: firebaseAction((context, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  })
}
