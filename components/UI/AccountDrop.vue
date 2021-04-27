<template>
  <div class="account-dropdown">
    <button class="cta" @click="opendd">
      <div class="icon">
        <get-svg :svgid="114" width="20" height="20" />
      </div>
      <div class="text">My Account</div>
    </button>
    <div :class="{ 'cta-dd': true, 'd-none': !opened, 'shadow-sm': true }">
      <div class="header">
        <h6 class="name">Islam Soliman</h6>
        <p class="email">isoliman@cloudmaize.com</p>
      </div>
      <div class="footer">
        <nuxt-link to=""></nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      opened: false
    };
  },
  methods: {
    opendd() {
      this.opened = !this.opened;
      console.log(this.opened)
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.account-dropdown {
    position: relative;
}
button.cta {
  background-color: transparent;
  border-radius: 5px;
  border: none;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .icon::v-deep {
    @include h.appDirAuto($margin-end: 15px);
    svg path {
      fill: #838383;
    }
  }
  .text {
    color: #838383;
  }
  &::after {
    content: "";
    @include h.arrow("down", #c4c4c4, 4px, 1px);
    @include h.appDirAuto($margin-start: 13px);
    position: relative;
    bottom: 2px;
  }
}
.cta-dd {
  border-radius: 5px;
  background-color: white;
  position: absolute;
  
  .header {
    background-color: #f2f2f2;
    padding: 10px;
  }
}
</style>
