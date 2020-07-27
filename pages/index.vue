<template>
  <v-main>
    <v-container v-if="isWaiting">
      <p>読み込み中</p>
    </v-container>
    <v-container v-else>
      <todo v-if="isLogin" :user="user"></todo>
      <login v-if="!isLogin"></login>
    </v-container>
  </v-main>
</template>

<script>
import todo from "~/components/todo.vue";
import login from "~/components/login.vue";
import firebase from "@/plugins/firebase";

export default {
  components: {
    todo,
    login
  },
  asyncData() {
    return {
      isWaiting: true,
      isLogin: false,
      user: null
    };
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    logOut() {
      firebase.auth().signOut();
    }
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      this.isWaiting = false;
      if (user) {
        this.isLogin = true;
        this.user = user;
      } else {
        this.isLogin = false;
        this.user = null;
      }
    });
  }
};
</script>

