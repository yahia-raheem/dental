<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="title">Profile Info</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row">
          <div class="form-group col-lg-6 col-md-12">
            <label for="docName" class="form-label">Doctor Name</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.name.$error }"
              id="docName"
              v-model.trim="name"
              placeholder="Doctor Name"
            />
            <div class="invalid-feedback" v-if="!$v.name.required">
              This field is Required
            </div>
          </div>
          <div class="form-group col-lg-6 col-md-12">
            <label for="spec" class="form-label">Degree</label>
            <v-select
              id="spec"
              v-model.trim="degree"
              :options="parameters.degree"
              label="name"
              placeholder="Degree"
            ></v-select>
          </div>
        </div>
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
          <div class="form-group col-12"></div>
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
          <div class="form-group col-12">
            <label for="profileDesc" class="form-label">Description</label>
            <textarea
              class="form-control"
              v-model.trim="description"
              id="profileDesc"
              rows="5"
              placeholder="Describe your self in a few words"
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
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

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
      name: this.doctor.name,
      about: this.doctor.about,
      image: this.doctor.picture,
      cover: this.doctor.cover,
      spec: this.doctor.specialties,
      degree: this.doctor.degree,
      description: this.doctor.description
    };
  },
  validations: {
    name: {
      required
    }
  },
  computed: {
    ...mapGetters({
      parameters: "parameters/parameters"
    }),
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
    changeImage(name) {
      this.$refs.image.querySelector("label").innerHTML = name;
      this.$refs.image.classList.add("dirty");
    },
    changeCover(name) {
      this.$refs.cover.querySelector("label").innerHTML = name;
      this.$refs.cover.classList.add("dirty");
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.name != this.doctor.name) {
          this.form.append("profile_name", this.name);
        }
        if (this.about != this.doctor.about) {
          this.form.append("about", this.about);
        }
        if (this.description != this.doctor.description) {
          this.form.append("description", this.description);
        }
        if (this.degree != this.doctor.degree) {
          this.form.append("degree", this.degree);
        }

        const data = { docId: this.doctor.id, data: this.form };
        // for (var pair of this.form.entries()) {
        //   console.log(pair[0] + ", " + pair[1]);
        // }
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
    }
  },
  mounted() {
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
