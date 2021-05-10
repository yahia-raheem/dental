<template>
  <div class="edit-box" id="verificationBox">
    <div class="header">
      <h6 class="title">Profile Info</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row">
          <div class="col-12 col-sm-4">
            <div class="img-container">
              <get-img-by-link
                imglink="/images/Group 570.png"
                classes="bg-image verification-id"
                responsive="xxl:512px"
              />
            </div>
          </div>
          <div
            class="form-group col-lg-8 col-md-12 d-flex flex-column justify-content-center align-items-start"
          >
            <label class="form-label">Verification ID</label>
            <div class="custom-file" ref="idFile">
              <input
                type="file"
                class="custom-file-input"
                id="idFile"
                @change="idChanged"
                accept="image/*"
              />
              <label class="custom-file-label" for="idFile">Choose Image</label>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="cta-container">
            <button
              type="submit"
              class="btn btn-primary submit-btn d-flex justify-content-center align-items-center"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    doctor: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      docid: this.doctor.identification
    };
  },
  computed: {
    form() {
      return new FormData();
    }
  },
  methods: {
    idChanged(e) {
      this.changeId(e.target.files[0].name);
      this.docid = e.target.files[0];
      this.form.append("identification", this.docid);
    },
    changeId(name) {
      this.$refs.idFile.querySelector("label").innerHTML = name;
      this.$refs.idFile.classList.add("dirty");
    },
    submit() {
      const data = { docId: this.doctor.id, data: this.form };
      this.$store
        .dispatch("doctors/updateDoc", data)
        .then(result => {
          this.$vToastify.success({
            body: "Profile Updated Successfully",
            title: "Success"
          });
          this.$router.go();
        })
        .catch(err => {
          this.$vToastify.error({
            body: "An unknown error occured",
            title: "Sorry"
          });
        });
    }
  },
  mounted() {
    var linkArr;
    if (this.docid != null) {
      linkArr = this.docid.split("/");
      this.changeId(linkArr[linkArr.length - 1]);
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.custom-file {
  &.dirty {
    label::after {
      content: "change" !important;
      background-color: #d24c35;
      color: white;
    }
  }
}
.edit-box::v-deep {
  .img-container {
    @include h.box-ratio(16,10);
    margin-bottom: 20px;
  }
}
</style>
