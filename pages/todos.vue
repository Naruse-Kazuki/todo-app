<template>
  <v-app>
    <nuxt-child></nuxt-child>

    <div>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <span v-if="todo.created" id="todo">
            <v-checkbox :checked="todo.done" @change="toggle(todo)"></v-checkbox>
            <span :class="{done: todo.done}" id="todoText">
              <span id="todoName">{{todo.name}}</span>
              {{todo.created.toDate() | dateFilter}}
            </span>
            <span id="deleteBtn">
              <v-btn outlined color="red" @click="remove(todo.id)">delete</v-btn>
            </span>
          </span>
        </li>
      </ul>
      <br />
      <hr />
      <v-form v-on:submit.prevent="add">
        <v-text-field label="Todoを追加" v-model="name"></v-text-field>
        <v-btn color="cyan" id="addBtn">Add</v-btn>
      </v-form>
    </div>
    <div v-if="!isLogin" class="btn_login">
      <router-link to="Login" id="login">
        <v-btn text>ログイン</v-btn>
      </router-link>
    </div>
    <div v-else class="log_wrap">
      <v-btn text color="error" class="google_logout" outlined @click="logOut">ログアウト</v-btn>
    </div>
  </v-app>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import firebase from "@/plugins/firebase";

export default {
  data: function() {
    return {
      name: "",
      done: false,
      content: ""
    };
  },
  created: function() {
    this.$store.dispatch("todos/init");
  },
  methods: {
    add() {
      this.$store.dispatch("todos/add", this.name);
      this.name = "";
    },
    remove(id) {
      this.$store.dispatch("todos/remove", id);
    },
    toggle(todo) {
      this.$store.dispatch("todos/toggle", todo);
    },
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
  },
  computed: {
    todos() {
      return this.$store.getters["todos/orderdTodos"];
    }
    // ...mapState(["todos"])
  },
  filters: {
    dateFilter(date) {
      return moment(date).format("YYYY/MM/DD HH:mm");
    }
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
  }
};
</script>

<style scoped>
div {
  margin-left: 10px;
  margin-right: 10px;
}
li > span > span.done {
  text-decoration: line-through;
}
ul {
  list-style: none;
  padding: 0;
}
#todo {
  display: flex;
  justify-content: left;
  align-items: center;
}
#todoText {
  margin-right: 10px;
}
#addBtn {
  color: white;
}
#todoName {
  font-size: 24px;
}
</style>