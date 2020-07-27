<template>
  <v-row class="log_wrap" align="center" justify="center">
    <v-col>
      <v-list v-for="todo in todos" :key="todo.id">
        <v-list-item v-if="todo.created" id="todo">
          <v-checkbox :checked="todo.done" @change="toggle(todo)"></v-checkbox>
          <v-list-item-content>
            <span id="todoName" :class="{done: todo.done}">{{todo.name}}</span>
            <span id="todoDate" :class="{done: todo.done}">{{todo.created.toDate() | dateFilter}}</span>
          </v-list-item-content>
          <span id="deleteBtn">
            <v-btn outlined color="red" @click="remove(todo.id)">delete</v-btn>
          </span>
        </v-list-item>
      </v-list>
      <br />
      <hr />
      <v-form v-on:submit.prevent="add">
        <v-text-field label="Todoを追加" v-model="name"></v-text-field>
        <v-btn color="cyan" id="addBtn" @click="add">Add</v-btn>
      </v-form>
      <br />
      <v-row align="center" justify="center">
        <v-btn text color="error" class="google_logout" outlined @click="logOut">ログアウト</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import moment from "moment";
import firebase from "@/plugins/firebase";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("todos");

export default {
  data: function() {
    return {
      name: "",
      done: false
    };
  },
  created: function() {
    // this.$store.dispatch("todos/init");
    this.Init();
  },
  methods: {
    ...mapActions(["Init", "Add", "Remove", "Toggle"]),
    add() {
      this.Add(this.name);
      // this.$store.dispatch("todos/add", this.name);
      this.name = "";
    },
    remove(id) {
      // this.$store.dispatch("todos/remove", id);
      this.Remove(id);
    },
    toggle(todo) {
      // this.$store.dispatch("todos/toggle", todo);
      this.Toggle(todo);
    },
    logOut() {
      firebase.auth().signOut();
      // this.$router.push("/login");
    }
  },
  computed: {
    ...mapGetters(["orderdTodos"]),
    todos() {
      // return this.$store.getters["todos/orderdTodos"];
      return this.orderdTodos;
    }
  },
  filters: {
    dateFilter(date) {
      return moment(date).format("YYYY/MM/DD HH:mm");
    }
  }
};
</script>

<style scoped>
#todo {
  display: flex;
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
#todoName.done {
  text-decoration: line-through;
}
#todoDate {
  font-size: 12px;
}
#todoDate.done {
  text-decoration: line-through;
}
</style>