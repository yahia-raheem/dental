<template>
  <form @submit.prevent="onSubmit">
    <div class="errors" v-if="submitionStatus === 'ERROR'">
      Please Correct the errors below
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        :class="{ 'is-invalid': $v.name.$error }"
        v-model.trim="$v.name.$model"
        placeholder="Name"
      />
      <div class="invalid-feedback" v-if="$v.name.$error">
        Name is required, and minimum length is 4
      </div>
    </div>
    <div class="form-group">
      <input
        type="email"
        class="form-control"
        :class="{ 'is-invalid': $v.email.$error }"
        v-model.trim="$v.email.$model"
        placeholder="Email"
      />
      <div class="invalid-feedback" v-if="$v.email.$error">
        Email is required, and minimum length is 4
      </div>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        :class="{ 'is-invalid': $v.mobile.$error }"
        v-model.trim="$v.mobile.$model"
        placeholder="Mobile"
      />
      <div class="invalid-feedback" v-if="$v.mobile.$error">
        Please enter a valid mobile number, also mobile is required
      </div>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        :class="{ 'is-invalid': $v.subject.$error }"
        v-model.trim="$v.subject.$model"
        placeholder="Subject"
      />
      <div class="invalid-feedback" v-if="$v.subject.$error">
        Subject's minimum length is 4
      </div>
    </div>
    <div class="form-group">
      <textarea
        class="form-control"
        :class="{ 'is-invalid': $v.inquiry.$error }"
        v-model.trim="$v.inquiry.$model"
        placeholder="Inquiry"
      ></textarea>
      <div class="invalid-feedback" v-if="$v.inquiry.$error">
        Inquiry's minimum length is 4
      </div>
    </div>
    <button class="btn btn-primary" type="submit">Send Request</button>
    <div class="success" v-if="submitionStatus == 'SUCCESS'"
      >Your Request is Successfully Submited, Thank you for your time!</div
    >
  </form>
</template>
<script>
import { required, minLength, email, numeric } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      name: "",
      email: "",
      mobile: "",
      subject: "",
      inquiry: "",
      submitionStatus: "PENDING"
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    },
    mobile: {
      required,
      numeric
    },
    subject: {
      minLength: minLength(4)
    },
    inquiry: {
      minLength: minLength(4)
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitionStatus = "ERROR";
      } else {
        const emailBody = {
          "your-name": this.name,
          "your-email": this.email,
          "your-mobile": this.mobile,
          "your-subject": this.subject,
          "your-inquiry": this.inquiry
        };
        const form = new FormData();
        for (const field in emailBody) {
          if (Object.hasOwnProperty.call(emailBody, field)) {
            const element = emailBody[field];
            form.append(field, element);
          }
        }
        this.$axios
          .$post(
            `${process.env.baseUrl}/wp-json/contact-form-7/v1/contact-forms/5/feedback`,
            form
          )
          .then(res => {
            console.log(res);
            if (res.status == "mail_sent") {
              this.submitionStatus = "SUCCESS";
            }
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.errors {
  text-align: center;
  margin-bottom: 10px;
  color: #e23f4f;
}
.form-group {
  .form-control {
    min-height: 50px;
    color: black;
    border-radius: 5px;
    box-shadow: none;
    &::placeholder {
      color: #bcbcbc;
    }
    &:not(.is-invalid) {
      border: 1px solid #bcbcbc;
    }
  }
  textarea {
    min-height: 130px !important;
  }
}
button[type="submit"] {
  width: 100%;
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 10px;
}
.success {
    border: 1px solid #28A745;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #28A745;
    padding: 10px;
    margin-top: 15px;
}
</style>
