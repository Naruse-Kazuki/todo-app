<template>
  <div></div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("todos/init");
  }
};
</script>