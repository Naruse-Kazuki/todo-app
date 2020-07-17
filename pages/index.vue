<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      content: ""
    };
  },
  computed: {
    ...mapState(["todos"])
  }
};
</script>

<style>
</style>
