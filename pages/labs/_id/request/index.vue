<template>
  <section class="lab-request page internal">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="submit">
            <h4 class="sec-title">Patients Information</h4>
            <div class="form-container">
              <div class="form-row">
                <div class="form-group col">
                  <label for="patientName">Patient Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="patientName"
                    v-model.trim="patientName"
                    placeholder="Patient Name"
                  />
                </div>
                <div class="form-group col">
                  <label for="gender">Gender</label>
                  <v-select
                    id="gender"
                    v-model.trim="gender"
                    :options="['Male', 'Female']"
                    placeholder="Gender"
                  ></v-select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <label for="age">Age</label>
                  <input
                    type="text"
                    class="form-control"
                    id="age"
                    v-model.trim="age"
                    placeholder="Age"
                  />
                </div>
                <div class="form-group col">
                  <label for="date" class="d-block">Delivery Date</label>
                  <date-picker
                    v-model="date"
                    placeholder="dd/mm/yy"
                    format="DD/MM/YY"
                  ></date-picker>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-12">
                  <label for="caseDetails">Case Details</label>
                  <textarea
                    class="form-control"
                    v-model.trim="details"
                    id="caseDetails"
                    rows="5"
                    placeholder="Case Details"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="sep"></div>
            <h4 class="sec-title">Media</h4>
            <div class="form-container">
              <div class="form-row">
                <div class="form-group col">
                  <label>Digital Impression</label>
                  <div class="custom-file" ref="diRef">
                    <input
                      type="file"
                      class="custom-file-input"
                      :class="{ 'is-invalid': $v.di.$error }"
                      id="digitalImpression"
                      @change="diChanged"
                      accept=".stl"
                    />
                    <label class="custom-file-label" for="profileImage"
                      >Select</label
                    >
                    <div class="invalid-feedback" v-if="$v.di.$error">
                      Digital impression file must have stl file format
                    </div>
                  </div>
                  <small id="locHelp" class="form-text text-muted"
                    >Accpeted File Type: stl</small
                  >
                </div>
                <div class="form-group col">
                  <label class="form-label">Photos</label>
                  <div class="custom-file" ref="photos">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="photos"
                      @change="photosChanged"
                      accept="image/*"
                      multiple
                    />
                    <label class="custom-file-label" for="profileCover"
                      >Select</label
                    >
                  </div>
                  <small id="locHelp" class="form-text text-muted"
                    >Acepted File Types: jpg, jpeg, png</small
                  >
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <label>DIACOM</label>
                  <div class="custom-file" ref="diacom">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="diacom"
                      @change="diacomChanged"
                    />
                    <label class="custom-file-label" for="diacom">Select</label>
                  </div>
                </div>
                <div class="form-group col">
                  <label class="form-label">Video</label>
                  <div class="custom-file" ref="video">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="video"
                      @change="videoChanged"
                      accept="video/*"
                    />
                    <label class="custom-file-label" for="profileCover"
                      >Select</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: { DatePicker },
  data() {
    return {
      patientName: "",
      gender: "",
      age: "",
      date: "",
      details: "",
      di: "",
      photos: "",
      diacom: "",
      video: "",
    };
  },
  validations: {
    di: {
      valid: function (value) {
        return value.name.split(".").pop() == "stl";
      },
    },
  },
  methods: {
    diChanged(e) {
      this.di = e.target.files[0];
      this.$v.di.$touch();
      if (!this.$v.$invalid) {
        this.$refs.diRef.querySelector("label").innerHTML =
          e.target.files[0].name;
        this.$refs.diRef.classList.add("dirty");
      }
    },
    photosChanged(e) {
      this.photos = e.target.files;
      this.$refs.photos.querySelector(
        "label"
      ).innerHTML = `${e.target.files.length} files selected`;
      this.$refs.photos.classList.add("dirty");
    },
    diacomChanged(e) {
      this.diacom = e.target.files[0];
      this.$refs.diacom.querySelector("label").innerHTML =
        e.target.files[0].name;
      this.$refs.diacom.classList.add("dirty");
    },
    videoChanged(e) {
      this.video = e.target.files[0];
      this.$refs.video.querySelector("label").innerHTML =
        e.target.files[0].name;
      this.$refs.video.classList.add("dirty");
    },
  },
};
</script>
<style lang="scss" scoped>
.form-container {
  margin-left: auto;
  margin-right: auto;
}
.mx-datepicker {
  width: 100%;
}
.custom-file {
  font-weight: normal;
  label {
    font-weight: normal !important;
  }
  &.dirty {
    label::after {
      content: "change";
      background-color: #d24c35;
      color: white;
    }
  }
}
.sep {
  margin: 30px 0 20px;
  border-top: 1px solid lightgray;
}
.sec-title {
  margin-bottom: 20px !important;
}
</style>
