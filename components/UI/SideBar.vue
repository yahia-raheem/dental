<template>
  <div id="mySidenav" class="sidenav">
    <div class="sidebar-header">
      <h3 class="title" v-if="!isLoggedIn">Main Menu</h3>
      <div class="logged-header" v-if="isLoggedIn">
        <h6 class="name">{{ user.name }}</h6>
        <p class="email">{{ user.email }}</p>
      </div>
      <a href="javascript:void(0)" class="closebtn">&times;</a>
    </div>
    <navigation-bar />
  </div>
</template>
<script>
import NavigationBar from "~/components/UI/NavigationBar.vue";

export default {
  data() {
    return {
      isLoggedIn: this.$auth.loggedIn,
      user: this.$auth.user
    };
  },
  components: {
    NavigationBar
  }
};
</script>
<style lang="scss" scoped>
.logged-header {
 .name, .email {
   color: white;
 }
 .name {
   margin-bottom: 0;
 }
}
</style>
