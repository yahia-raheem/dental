<template>
  <section class="page internal doctor-register">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h4 class="sec-title" v-if="status == 'pending'">Sign Up</h4>
          <h4 class="sec-title" v-if="status == 'profile'">Create Profile</h4>
          <h4 class="sec-title" v-if="status == 'success'">
            Account created successfully!
          </h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-start">
          <step-one
            v-on:done="stepDone('pending')"
            v-if="status == 'pending'"
          />
          <step-two
            v-on:done="profDone"
            v-on:changeType="changeType"
            v-if="status == 'profile'"
          />
          <register-success :type="type" :profId="createdId" v-if="status == 'success'" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import RegisterSuccess from "~/components/registeration/RegisterSuccess.vue";
import StepOne from "~/components/registeration/StepOne.vue";
import StepTwo from "~/components/registeration/StepTwo.vue";

export default {
  components: { StepOne, StepTwo, RegisterSuccess },
  async fetch(context) {
    context.store.dispatch("pages/setTitle", "Sign Up");
  },
  created() {
    if (this.$auth.loggedIn) {
      this.status = "profile";
    }
  },
  data() {
    return {
      status: "pending",
      type: "dentist",
      createdId: ""
    };
  },
  methods: {
    stepDone(step) {
      switch (step) {
        case "pending":
          this.status = "profile";
          break;
        case "profile":
          this.status = "success";
          break;
      }
    },
    profDone(id) {
      this.status = 'success';
      this.createdId = id;
    },
    changeType(type) {
      switch (type) {
        case "dentist":
          this.type = "dentist";
          break;
        case "lab":
          this.type = "lab";
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss"></style>
