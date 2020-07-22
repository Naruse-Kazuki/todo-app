<template>
  <!-- <v-app> -->
  <v-app-bar app dark>
    <v-toolbar-title>
      <router-link to="todos" style="text-decoration: none; color: white;">Todoリスト</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <div v-if="!isLogin" class="btn_login">
        <router-link to="Login" id="login">
          <v-btn text>ログイン</v-btn>
        </router-link>
      </div>
      <div v-else class="log_wrap">
        <v-btn text color="error" class="google_logout" outlined @click="logOut">ログアウト</v-btn>
    </div>-->
  </v-app-bar>
  <!-- <body> -->
  <!-- login -->
  <!-- <div v-else class="log_wrap">
      <nuxt-child></nuxt-child>
  </div>-->
  <!-- <button v-if="isLogin">ログアウト</button> -->
  <!-- </body> -->
  <!-- </v-app> -->
</template>

<script>
// import { mapState } from "vuex";
// import firebase from "@/plugins/firebase";
// export default {
//   data() {
//     return {
//       content: ""
//     };
//   },
//   computed: {
//     ...mapState(["todos"])
//   },
//   asyncData() {
//     return {
//       isWaiting: true,
//       isLogin: false,
//       user: []
//     };
//   },
//   mounted: function() {
//     firebase.auth().onAuthStateChanged(user => {
//       this.isWaiting = false;
//       if (user) {
//         this.isLogin = true;
//         this.user = user;
//         this.$router.push("/todos");
//       } else {
//         this.isLogin = false;
//         this.user = [];
//       }
//     });
//   },
//   methods: {
//     googleLogin() {
//       const provider = new firebase.auth.GoogleAuthProvider();
//       firebase
//         .auth()
//         .signInWithRedirect(provider)
//         .then(user => {
//           this.$router.push("/todos");
//         });
//     },
//     logOut() {
//       firebase.auth().signOut();
//     }
//   }
// };
//
</script>

<style scoped>
#login {
  text-decoration: none;
}
</style>