<template>
  <div>
    <header></header>
    <div v-if="!isLogin" class="btn_login">
      <router-link to="Login">ログイン</router-link>
    </div>
    <!-- login -->
    <div v-else class="log_wrap">
      <button class="google_logout" outlined @click="logOut">ログアウト</button>
      <nuxt-child></nuxt-child>
    </div>
    <!-- <button v-if="isLogin">ログアウト</button> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "@/plugins/firebase";
export default {
  data() {
    return {
      content: ""
    };
  },
  // async mounted() {
  //   // ログイン済みであれば、ログアウトボタンを表示する
  //   await auth.onAuthStateChanged(user => (this.isLogin = user ? true : false));
  // },
  // methods: {
  //   async logout() {
  //     await auth.signOut();
  //     this.$router.push("/Login");
  //   }
  // },
  computed: {
    // user() {
    //   return this.$store.getters["user"];
    // },
    ...mapState(["todos"])
  },
  asyncData() {
    return {
      isWaiting: true,
      isLogin: false,
      user: []
    };
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      this.isWaiting = false;
      if (user) {
        this.isLogin = true;
        this.user = user;
        this.$router.push("/todos");
      } else {
        this.isLogin = false;
        this.user = [];
      }
    });
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(user => {
          this.$router.push("/todos");
        });
    },
    logOut() {
      firebase.auth().signOut();
    }
  }
};
</script>

<style>
</style>
