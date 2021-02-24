<template>
  <div id="mySidenav" class="sidenav">
    <div class="sidebar-header">
      <h3 class="title">Main Menu</h3>
      <a href="javascript:void(0)" class="closebtn">&times;</a>
    </div>
    <navigation-bar />
  </div>
</template>
<script>
import NavigationBar from '~/components/UI/NavigationBar.vue';

export default {
    components: {
        NavigationBar
    }
};
</script>
<style lang=""></style>
