<template>
  <div id="mySidenav" class="sidenav">
    <div class="sidebar-header">
      <h3 class="title" v-show="!isLoggedIn">Main Menu</h3>
      <div class="logged-header" v-show="isLoggedIn">
        <h6 class="name">{{ user.name }}</h6>
        <p class="email">{{ user.email }}</p>
      </div>
      <a href="javascript:void(0)" class="closebtn">&times;</a>
    </div>
    <navigation-bar />
    <hr class="sep" />
    <div class="account-options" v-show="isLoggedIn">
      <dropdown-profile-box
        :profile="user.doctor_profile"
        :type="'doctor'"
        v-if="user.doctor_profile != null"
      />
      <dropdown-profile-box
        :profile="profile"
        v-for="(profile, key) in user.lab_profiles"
        :key="key"
      />
      <nuxt-link class="add-profile btn w-100" to="/auth/register">
        Add profile
      </nuxt-link>
      <div class="footer">
        <nuxt-link to="/my-account/settings" class="settings btn btn-primary">
          <div class="icon">
            <get-svg :svgid="109" width="15" height="15" />
          </div>
          <div class="text">Settings</div>
        </nuxt-link>
        <button class="log-out btn btn-secondary" @click="logout">
          <div class="icon">
            <get-svg :svgid="115" width="15" height="15" />
          </div>
          <div class="text">Log Out</div>
        </button>
      </div>
    </div>
    <div class="account-options" v-show="!isLoggedIn">
      <nuxt-link to="/auth" class="btn btn-primary d-block mb-3">
        <div class="text">Log in</div>
      </nuxt-link>
      <nuxt-link to="/auth/register" class="btn btn-secondary d-block">
        <div class="text">Sign Up</div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import NavigationBar from "~/components/UI/NavigationBar.vue";
import DropdownProfileBox from "./DropdownProfileBox.vue";

export default {
  data() {
    return {
      isLoggedIn: this.$auth.loggedIn,
      user: this.$auth.user != null ? this.$auth.user : {}
    };
  },
  components: {
    NavigationBar,
    DropdownProfileBox
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.go();
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.logged-header {
  .name,
  .email {
    color: white;
  }
  .name {
    margin-bottom: 0;
  }
}
.sep {
  border-top: 1px solid white;
  margin-left: 40px;
  margin-right: 40px;
}
.account-options::v-deep {
  * {
    white-space: nowrap;
  }
  padding-left: 40px;
  padding-right: 40px;
  .prof-box {
    .title {
      color: white;
    }
  }
  .add-profile {
    width: 100%;
    border-radius: 0;
    background-color: h.$primary;
    color: white;
  }
  .footer {
    border-top: 1px solid lightgray;
    padding-top: 20px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .settings {
      svg path {
        fill: white;
      }
    }
    .settings,
    .log-out {
      width: 47%;
    }
  }
}
</style>
