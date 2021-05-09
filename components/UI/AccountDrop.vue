<template>
  <div class="account-dropdown">
    <button class="cta" @mouseover="opened = true" @mouseleave="opened = false">
      <div class="icon">
        <!-- <get-svg :svgid="114" width="20" height="20" /> -->
        <get-svg-2 svg="bell" width="20" height="20" />
      </div>
      <div class="text">My Account</div>
    </button>
    <div
      :class="{ 'cta-dd': true, 'd-none': !opened, 'shadow-sm': true }"
      @mouseover="opened = true"
      @mouseleave="opened = false"
    >
      <div class="header">
        <h6 class="name">{{ user.name }}</h6>
        <p class="email">{{ user.email }}</p>
      </div>
      <div class="body">
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
      </div>
      <div class="footer">
        <nuxt-link to="/my-account/settings" class="settings">
          <div class="icon">
            <get-svg :svgid="109" width="15" height="15" />
          </div>
          <div class="text">Settings</div>
        </nuxt-link>
        <button class="log-out" @click="logout">
          <div class="icon">
            <get-svg :svgid="115" width="15" height="15" />
          </div>
          <div class="text">Log Out</div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import DropdownProfileBox from "./DropdownProfileBox.vue";
export default {
  components: {
    DropdownProfileBox
  },
  data() {
    return {
      opened: false
    };
  },
  computed: {
    user() {
      return this.$auth.user ? this.$auth.user : {};
    }
  },
  methods: {
    opendd() {
      this.opened = !this.opened;
    },
    async logout() {
      await this.$auth.logout();
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
  padding: 20px 0;
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
  z-index: 11;
  min-width: 200px;
  bottom: 0;
  @include h.appDirAuto($end: 0);
  transform: translateY(100%);
  .header {
    background-color: #f2f2f2;
    padding: 10px 15px;
    .name {
      color: #646464;
      margin-bottom: 0;
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 3px;
    }
    .email {
      font-size: 0.8rem;
    }
  }
  .body {
    padding: 10px 15px;
    .add-profile {
      border: 1px solid #4866ad;
      color: #4866ad;
      font-size: 0.8rem;
    }
  }
  .footer {
    padding: 10px 15px;
    border-top: 1px solid #f2f2f2;
    .settings,
    .log-out {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 0;
      padding-right: 0;
      .text {
        font-size: 0.9rem;
      }
    }
    .settings {
      text-decoration: none;
      margin-bottom: 10px;
      .icon::v-deep {
        svg path {
          fill: #525252;
        }
      }
      .text {
        color: #525252;
      }
    }
    .icon {
      @include h.appDirAuto($margin-end: 10px);
    }
    .log-out {
      background-color: transparent;
      border: none;
      box-shadow: none;

      .icon::v-deep {
        svg path {
          fill: #a75655;
        }
      }
      .text {
        color: #a75655;
      }
    }
  }
}
</style>
