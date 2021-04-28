<template>
  <section class="account-settings page internal">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h4 class="sec-title">Account Settings</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-flex justify-content-start align-items-center flex-column">
          <general-settings />
          <authorization-settings />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AuthorizationSettings from '~/components/my-account/AuthorizationSettings.vue';
import GeneralSettings from "~/components/my-account/GeneralSettings.vue";

export default {
  components: { GeneralSettings, AuthorizationSettings },
  middleware: ['auth'],
};
</script>
<style lang="scss" scoped>
.account-settings::v-deep {
  .form-container {
    .header {
      padding-bottom: 15px;
      margin-bottom: 15px;
      border-bottom: 1px dotted #cfcdcd;
      h5 {
        margin-bottom: 0;
      }
    }
    .cta-container {
      padding-top: 15px;
      border-top: 1px dotted #cfcdcd;
      margin-top: 15px;
      padding-bottom: 0;
    }
  }
}
</style>
