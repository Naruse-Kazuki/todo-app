<template>
  <v-app>
    <div>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <span v-if="todo.created" id="todo">
            <v-checkbox :checked="todo.done" @change="toggle(todo)"></v-checkbox>
            <span
              :class="{done: todo.done}"
              id="todoText"
            >{{todo.name}} {{todo.created.toDate() | dateFilter}}</span>
            <v-btn outlined color="red" @click="remove(todo.id)">delete</v-btn>
          </span>
        </li>
      </ul>
      <br />
      <hr />
      <div class="form">
        <v-form v-on:submit.prevent="add">
          <v-text-field label="Todoを追加" v-model="name"></v-text-field>
          <v-btn color="cyan" id="addBtn">Add</v-btn>
        </v-form>
      </div>
    </div>
  </v-app>
</template>

<script>
import moment from "moment";

export default {
  data: function() {
    return {
      name: "",
      done: false
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
    }
  },
  computed: {
    todos() {
      return this.$store.getters["todos/orderdTodos"];
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
</style>