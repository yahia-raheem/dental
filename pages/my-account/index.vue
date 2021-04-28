<template>
  <div></div>
</template>
<script>
export default {
  middleware: ["auth"],
  created() {
    this.$router.push({ name: "my-account-settings" });
  }
};
</script>
<style lang=""></style>
