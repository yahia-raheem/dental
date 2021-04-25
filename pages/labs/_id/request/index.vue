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

            <!-- ------------------------------------------------------- media section --------------------------------------------------------  -->

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
                      :class="{ 'is-invalid': $v.photos.$error }"
                      id="photos"
                      @change="photosChanged"
                      accept=".jpg,.jpeg,.png"
                      multiple
                    />
                    <label class="custom-file-label" for="profileCover"
                      >Select</label
                    >
                    <div class="invalid-feedback" v-if="$v.photos.$error">
                      Photos must be either .jpg, .jpeg, or .png
                    </div>
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
                      :class="{ 'is-invalid': $v.diacom.$error }"
                      id="diacom"
                      accept=".diacom"
                      @change="diacomChanged"
                    />
                    <label class="custom-file-label" for="diacom">Select</label>
                    <div class="invalid-feedback" v-if="$v.diacom.$error">
                      The diacom file must have a .diacom file extension
                    </div>
                  </div>
                  <small id="locHelp" class="form-text text-muted"
                    >Accpeted File Type: diacom</small
                  >
                </div>
                <div class="form-group col">
                  <label class="form-label">Video</label>
                  <div class="custom-file" ref="video">
                    <input
                      type="file"
                      class="custom-file-input"
                      :class="{ 'is-invalid': $v.video.$error }"
                      id="video"
                      @change="videoChanged"
                      accept=".mp4"
                    />
                    <label class="custom-file-label" for="profileCover"
                      >Select</label
                    >
                    <div class="invalid-feedback" v-if="$v.video.$error">
                      Only mp4 videos are accepted
                    </div>
                  </div>
                  <small id="locHelp" class="form-text text-muted"
                    >Accpeted File Type: mp4</small
                  >
                </div>
              </div>
            </div>

            <!--  ------------------------------------------------------ technical details -------------------------------------------------------------  -->

            <div class="sep"></div>
            <h4 class="sec-title">Technical Details</h4>
            <div class="form-container">
              <div
                class="form-row"
                v-for="(req, key) in technicalRequests"
                :key="key"
              >
                <div class="form-group col-lg-6 col-md-12">
                  <label for="Teeth">Teeth Numbers</label>
                  <input
                    type="text"
                    class="form-control"
                    id="Teeth"
                    v-model.trim="req.teeth"
                    placeholder="Enter Numbers"
                  />
                  <small id="locHelp" class="form-text text-muted"
                    >Separate teeth numbers by a comma</small
                  >
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="gender">Type of Restoration</label>
                  <v-select
                    id="gender"
                    v-model.trim="req.restoration"
                    :options="['1', '2']"
                    placeholder="Select"
                  ></v-select>
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="material">Material</label>
                  <v-select
                    id="material"
                    v-model.trim="req.material"
                    :options="['1', '2']"
                    placeholder="Select"
                  ></v-select>
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="shade">Shade</label>
                  <input
                    type="text"
                    class="form-control"
                    id="shade"
                    v-model.trim="req.shade"
                    placeholder="Enter Text"
                  />
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="design">Design</label>
                  <v-select
                    id="design"
                    v-model.trim="req.design"
                    :options="['1', '2']"
                    placeholder="Select"
                  ></v-select>
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="implants">Implants</label>
                  <v-select
                    id="implants"
                    v-model.trim="req.implants"
                    :options="['1', '2']"
                    placeholder="Select"
                  ></v-select>
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="smile">Smile Design</label>
                  <v-select
                    id="smile"
                    v-model.trim="req.smileDesign"
                    :options="['1', '2']"
                    placeholder="Select"
                  ></v-select>
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="nextStep">Next Step</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nextStep"
                    v-model.trim="req.nextStep"
                    placeholder="Enter Text"
                  />
                </div>
                <div class="form-group col-lg-12">
                  <label for="nextStep">Comments</label>
                  <textarea
                    class="form-control"
                    id="nextStep"
                    v-model.trim="req.comments"
                    rows="5"
                    placeholder="Enter your comments"
                  />
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
import TechnicalRequest from "~/models/technicalRequest";

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
      technicalRequests: [new TechnicalRequest()]
    };
  },
  validations: {
    di: {
      valid: function(value) {
        if (value == null) {
          console.log("entered");
          return true;
        }
        return (
          value.name
            .trim()
            .toLowerCase()
            .split(".")
            .pop() == "stl"
        );
      }
    },
    photos: {
      valid: function(value) {
        if (value == null) {
          return true;
        }
        var noError = true;
        value.forEach(img => {
          const ext = img.name
            .trim()
            .toLowerCase()
            .split(".")
            .pop();
          if (ext != "jpg" && ext != "jpeg" && ext != "png") {
            noError = false;
          }
        });
        return noError;
      }
    },
    diacom: {
      valid: function(value) {
        if (value == null) {
          return true;
        }
        return (
          value.name
            .trim()
            .toLowerCase()
            .split(".")
            .pop() == "diacom"
        );
      }
    },
    video: {
      valid: function(value) {
        if (value == null) {
          return true;
        }
        return (
          value.name
            .trim()
            .toLowerCase()
            .split(".")
            .pop() == "mp4"
        );
      }
    }
  },
  methods: {
    diChanged(e) {
      this.di = e.target.files.length > 0 ? e.target.files[0] : null;
      this.$v.di.$touch();
      if (!this.$v.di.$error && this.di != null) {
        this.$refs.diRef.querySelector("label").innerHTML =
          e.target.files[0].name;
        this.$refs.diRef.classList.add("dirty");
      } else {
        this.$refs.diRef.querySelector("label").innerHTML = "select";
        this.$refs.diRef.classList.remove("dirty");
      }
    },
    photosChanged(e) {
      this.photos = e.target.files.length > 0 ? e.target.files : null;
      this.$v.photos.$touch();
      if (!this.$v.photos.$error && this.photos != null) {
        this.$refs.photos.querySelector(
          "label"
        ).innerHTML = `${e.target.files.length} files selected`;
        this.$refs.photos.classList.add("dirty");
      } else {
        this.$refs.photos.querySelector("label").innerHTML = "select";
        this.$refs.photos.classList.remove("dirty");
      }
    },
    diacomChanged(e) {
      this.diacom = e.target.files.length > 0 ? e.target.files[0] : null;
      this.$v.diacom.$touch();
      if (!this.$v.diacom.$error && this.diacom != null) {
        this.$refs.diacom.querySelector("label").innerHTML =
          e.target.files[0].name;
        this.$refs.diacom.classList.add("dirty");
      } else {
        this.$refs.diacom.querySelector("label").innerHTML = "select";
        this.$refs.diacom.classList.remove("dirty");
      }
    },
    videoChanged(e) {
      this.video = e.target.files.length > 0 ? e.target.files[0] : null;
      this.$v.video.$touch();
      if (!this.$v.video.$error && this.video != null) {
        this.$refs.video.querySelector("label").innerHTML =
          e.target.files[0].name;
        this.$refs.video.classList.add("dirty");
      } else {
        this.$refs.video.querySelector("label").innerHTML = "select";
        this.$refs.video.classList.remove("dirty");
      }
    }
  }
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
