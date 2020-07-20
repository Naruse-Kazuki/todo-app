<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span v-if="todo.created">
          <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
          <span :class="{done: todo.done}">{{todo.name}} {{todo.created.toDate() | dateFilter}}</span>
          <button @click="remove(todo.id)">delete</button>
        </span>
      </li>
    </ul>
    <div class="form">
      <form v-on:submit.prevent="add">
        <input v-model="name" />
        <button>Add</button>
      </form>
    </div>
    <!-- <div>
      <ul>
        <li v-for="(post, index) in posts" :key="index">
          <a :href="'post.url'" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
import moment from "moment";

export default {
  // async asyncData({ $axios }) {
  //   // 取得先のURL
  //   const url = "https://qiita.com/api/v2/items";
  //   // リクエスト（Get）
  //   const response = await $axios.$get(url);
  //   // 配列で返ってくるのでJSONにして返却
  //   return {
  //     posts: response
  //   };
  // },
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
</style>