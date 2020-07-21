<template>
  <v-app>
    <div class="wrapper" id="logPage">
      <!-- <nuxt-child></nuxt-child> -->
      <!-- header -->
      <header class="header">
        <!-- Loading -->
        <div v-if="isWaiting" class="log_wait">
          <p>読み込み中</p>
        </div>
        <!-- !login -->
        <div class="isLogin_wrap" v-else>
          <div v-if="!isLogin" class="btn_login">
            <v-btn class="google_login" outlined @click="googleLogin">Googleでログイン</v-btn>
          </div>
          <!-- login -->
          <div v-else class="log_wrap">
            <v-btn class="google_logout" outlined @click="logOut">ログアウト</v-btn>
          </div>
        </div>
      </header>
      <!-- body -->
    </div>
  </v-app>
</template>
<script>
import firebase from "@/plugins/firebase";

export default {
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
      firebase.auth().signInWithRedirect(provider);
    },
    logOut() {
      firebase.auth().signOut();
    }
  }
};
</script>
<style scoped>
</style>