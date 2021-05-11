<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="title">Profile Info</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row">
          <div class="form-group col-lg-6 col-md-12">
            <label class="form-label">Profile Image</label>
            <div class="custom-file" ref="image">
              <input
                type="file"
                class="custom-file-input"
                id="profileImage"
                @change="profileImage"
                accept="image/*"
              />
              <label class="custom-file-label" for="profileImage"
                >Choose Image</label
              >
            </div>
          </div>
          <div class="form-group col-lg-6 col-md-12">
            <label class="form-label">Profile Cover</label>
            <div class="custom-file" ref="cover">
              <input
                type="file"
                class="custom-file-input"
                id="profileCover"
                @change="profileCover"
                accept="image/*"
              />
              <label class="custom-file-label" for="profileCover"
                >Choose Image</label
              >
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6 col-md-12">
            <label for="labName" class="form-label">Lab Name</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.name.$error }"
              id="labName"
              v-model.trim="name"
              placeholder="Lab Name"
            />
            <div class="invalid-feedback" v-if="!$v.name.required">
              This field is Required
            </div>
          </div>
          <div class="form-group col-lg-6 col-md-12">
            <label class="form-label">PDF Price List</label>
            <div class="custom-file" ref="pdf">
              <input
                type="file"
                class="custom-file-input"
                id="pdfFile"
                @change="pdfFile"
                accept="application/pdf"
              />
              <label class="custom-file-label" for="pdfFile">Choose file</label>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-12">
            <label for="profileAbout" class="form-label">About</label>
            <textarea
              class="form-control"
              v-model.trim="about"
              id="profileAbout"
              rows="5"
              placeholder="About Details"
            ></textarea>
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
import { required } from "vuelidate/lib/validators";

export default {
  props: {
    lab: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    this.$parent.$on("saveAll", () => {
      this.submit();
    });
  },
  data() {
    return {
      name: this.lab.name,
      about: this.lab.about,
      image: this.lab.picture,
      cover: this.lab.cover,
      pdf: this.lab.lab_file
    };
  },
  validations: {
    name: {
      required
    }
  },
  computed: {
    form() {
      return new FormData();
    }
  },
  methods: {
    profileImage(e) {
      this.changeImage(e.target.files[0].name);
      this.form.append("picture", e.target.files[0]);
    },
    profileCover(e) {
      this.changeCover(e.target.files[0].name);
      this.form.append("cover", e.target.files[0]);
    },
    pdfFile(e) {
      this.changePdf(e.target.files[0].name);
      this.form.append("lab_file", e.target.files[0]);
    },
    changePdf(name) {
      this.$refs.pdf.querySelector("label").innerHTML = name;
      this.$refs.pdf.classList.add("dirty");
    },
    changeImage(name) {
      this.$refs.image.querySelector("label").innerHTML = name;
      this.$refs.image.classList.add("dirty");
    },
    changeCover(name) {
      this.$refs.cover.querySelector("label").innerHTML = name;
      this.$refs.cover.classList.add("dirty");
    },
    prepData() {
      var linkArr;
      if (this.image != null) {
        linkArr = this.image.split("/");
        this.changeImage(linkArr[linkArr.length - 1]);
      }
      if (this.cover != null) {
        linkArr = this.cover.split("/");
        this.changeCover(linkArr[linkArr.length - 1]);
      }
      if (this.pdf != null) {
        linkArr = this.pdf.split("/");
        this.changePdf(linkArr[linkArr.length - 1]);
      }
    },
    reset() {
      this.name = this.lab.name;
      this.about = this.lab.about;
      this.image = this.lab.picture;
      this.cover = this.lab.cover;
      this.pdf = this.lab.lab_file;
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.name != this.lab.name) {
          this.form.append("profile_name", this.name);
        }
        if (this.about != this.lab.about) {
          this.form.append("about", this.about);
        }
        const data = { labId: this.lab.id, data: this.form };
        // for (var pair of this.form.entries()) {
        //   console.log(pair[0] + ", " + pair[1]);
        // }
        this.$store
          .dispatch("labs/updateLab", data)
          .then(_ => {
            this.$vToastify.success({
              body: "Profile Info has been updated",
              title: "Success"
            });
            this.reset();
            this.prepData();
            // this.$router.go();
          })
          .catch(err => {
            this.$vToastify.error({
              body: "An unknown error occured",
              title: "Sorry"
            });
          });
      }
    }
  },
  mounted() {
    this.prepData();
  }
};
</script>

<style lang="scss" scoped>
.custom-file {
  &.dirty {
    label::after {
      content: "change";
      background-color: #d24c35;
      color: white;
    }
  }
}
</style>
