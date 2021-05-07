<template>
  <section class="lab-request page internal">
    <div class="container-fluid" v-if="verified">
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="submit">
            <h4 class="sec-title">Patients Information</h4>
            <div class="form-container">
              <div class="form-row">
                <div class="form-group col-lg-6 col-md-12">
                  <label for="patientName">Patient Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="patientName"
                    v-model.trim="patientName"
                    placeholder="Patient Name"
                  />
                </div>
                <div class="form-group col-lg-6 col-md-12">
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
                <div class="form-group col-lg-6 col-md-12">
                  <label for="age">Age</label>
                  <input
                    type="text"
                    class="form-control"
                    id="age"
                    v-model.trim="age"
                    placeholder="Age"
                  />
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="date" class="d-block">Delivery Date</label>
                  <date-picker
                    v-model="date"
                    placeholder="dd/mm/yy"
                    :value-type="'timestamp'"
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
                <div class="form-group col-lg-6 col-md-12">
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
                <div class="form-group col-lg-6 col-md-12">
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
                <div class="form-group col-lg-6 col-md-12">
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
                <div class="form-group col-lg-6 col-md-12">
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
            <div class="form-container technical-sec">
              <div class="nav-btns d-none d-lg-block">
                <button
                  class="btn tab-btn"
                  :class="{ active: key == selected }"
                  v-for="(req, key) in technicalRequests"
                  :key="key"
                  @click.prevent="changeTab(key)"
                >
                  Group {{ key + 1 }}
                  <button
                    class="btn delete-btn"
                    @click.prevent="deleteTab(key)"
                    v-if="technicalRequests.length > 1"
                  >
                    x
                  </button>
                </button>
                <button class="btn btn-primary new-tab" @click.prevent="addTab">
                  Add Group +
                </button>
              </div>
              <div class="nav-mobile-btns d-lg-none">
                <div class="col-12">
                  <v-select
                    id="tabSelect"
                    :options="tapddOptions"
                    :value="tapddSelected"
                    v-on:search:focus="selectOpened"
                    v-on:option:selected="changeTab"
                  ></v-select>
                </div>
                <div class="btns-container">
                  <button
                    class="mobile-new-tab btn btn-primary w-100"
                    @click.prevent="addTab"
                  >
                    New Group
                  </button>
                  <button
                    class="mobile-delete-btn btn w-100"
                    @click.prevent="deleteTab(selected)"
                    v-if="technicalRequests.length > 1"
                  >
                    DeleteGroup
                  </button>
                </div>
              </div>
              <div
                class="form-row"
                :class="{ 'd-none': key != selected }"
                v-for="(req, key) in technicalRequests"
                :key="key"
              >
                <div class="col-12">
                  <div
                    class="image-container d-flex justify-content-center align-items-center mx-auto mb-4"
                  >
                    <get-img :imgid="113" responsive="xxl:600px" />
                  </div>
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="Teeth">Teeth Numbers</label>
                  <input
                    type="text"
                    class="form-control"
                    id="Teeth"
                    v-model.trim="req.tooth_number"
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
                    :options="parameters.restoration"
                    placeholder="Select"
                  ></v-select>
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="material">Material</label>
                  <v-select
                    id="material"
                    v-model.trim="req.material"
                    :options="parameters.material"
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
                    :options="parameters.design"
                    placeholder="Select"
                  ></v-select>
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="implants">Implants</label>
                  <v-select
                    id="implants"
                    v-model.trim="req.implants"
                    :options="parameters.implants"
                    placeholder="Select"
                  ></v-select>
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="smile">Smile Design</label>
                  <v-select
                    id="smile"
                    v-model.trim="req.smile_design"
                    :options="parameters.smile_design"
                    placeholder="Select"
                  ></v-select>
                </div>
                <div class="form-group col-lg-6 col-md-12">
                  <label for="nextStep">Next Step</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nextStep"
                    v-model.trim="req.next_step"
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
            <div class="request-submit">
              <div class="form-row">
                <div
                  class="col-lg-6 col-md-12 d-flex justify-content-start align-items-center"
                >
                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      v-model="sendAgent"
                      class="form-check-input"
                      id="exampleCheck1"
                    />
                    <label class="form-check-label" for="exampleCheck1"
                      >Send Agent</label
                    >
                  </div>
                </div>
                <div
                  class="col-lg-6 col-md-12 d-flex justify-content-end align-items-center"
                >
                  <button
                    type="submit"
                    class="btn btn-primary submit-btn d-flex justify-content-center align-items-center"
                  >
                    <span class="text"> Submit </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="!verified">
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <p class="text-center">
            you need to have a verified doctor's profile to send a request.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/en";
import TechnicalRequest from "~/models/technicalRequest";
import { mapGetters } from "vuex";

export default {
  components: { DatePicker },
  middleware: "auth",
  data() {
    return {
      selected: 0,
      patientName: null,
      gender: null,
      age: null,
      date: null,
      details: null,
      di: null,
      photos: null,
      diacom: null,
      video: null,
      technicalRequests: [new TechnicalRequest()],
      tapddOptions: [{ label: "Group 1", value: 0 }],
      tapddSelected: { label: "Group 1", value: 0 },
      verified: true,
      sendAgent: false
    };
  },
  validations: {
    di: {
      valid: function(value) {
        if (value == null) {
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
  mounted() {
    if (
      this.$auth.user.doctor_profile == null ||
      this.$auth.user.doctor_profile.status == 0
    ) {
      this.verified = false;
    }
  },
  async fetch(context) {
    context.store.dispatch("pages/setTitle", "Request");
  },
  computed: {
    ...mapGetters({
      parameters: "parameters/parameters"
    })
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = {
          patient_name: this.patientName,
          gender: this.gender,
          age: this.age,
          date: this.convertTZ(this.date),
          details: this.details,
          impression: this.di,
          diacom: this.diacom,
          video: this.video,
          agent: this.agent == false ? 0 : 1
        };
        const formData = new FormData();
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (element != null) {
              formData.append(key, element);
            }
          }
        }
        if (this.photos != null) {
          this.photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, photo);
          });
        }
        this.technicalRequests.forEach((tech, index) => {
          const techJson = tech.toJSON();
          for (const key in techJson) {
            if (Object.hasOwnProperty.call(techJson, key)) {
              const element = techJson[key];
              formData.append(`teeth[${index}][${key}]`, element);
            }
          }
        });
        try {
          await this.$store.dispatch("labs/sendRequest", formData);
          this.$vToastify.success({
            body: "your request has been sent",
            title: "success"
          });
          this.$router.go(-1);
        } catch (error) {
          if (error.response.status < 500) {
            for (const key in error.response.data.errors) {
              if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
                const element = error.response.data.errors[key];
                this.$vToastify.error({ body: element[0], title: key });
              }
            }
          } else {
            this.$vToastify.error({
              body: "something went wrong, please try again later",
              title: "error"
            });
          }
        }
      }
    },
    convertTZ(date) {
      return date - new Date(date).getTimezoneOffset() * 60 * 1000;
    },
    addTab() {
      this.technicalRequests.push(new TechnicalRequest());
      this.selected = this.technicalRequests.length - 1;
      this.tapddSelected = {
        label: `Group ${this.technicalRequests.length}`,
        value: this.selected
      };
    },
    changeTab(key) {
      if (typeof key === "object") {
        key = key.value;
      }
      if (key > this.technicalRequests.length - 1) {
        this.selected = this.technicalRequests.length - 1;
      } else {
        this.selected = key;
      }
      const selectedDisplay = parseInt(this.selected) + 1;
      this.tapddSelected = {
        label: `Group ${selectedDisplay}`,
        value: this.selected
      };
    },
    deleteTab(key) {
      this.technicalRequests.splice(key, 1);
      if (this.selected == key) {
        this.selected = this.technicalRequests.length - 1;
      }
      const selectedDisplay = parseInt(this.selected) + 1;
      this.tapddSelected = {
        label: `Group ${selectedDisplay}`,
        value: this.selected
      };
    },
    selectOpened() {
      this.tapddOptions = [];
      var displayKey = "";
      for (const key in this.technicalRequests) {
        if (Object.hasOwnProperty.call(this.technicalRequests, key)) {
          const element = this.technicalRequests[key];
          displayKey = parseInt(key) + 1;
          this.tapddOptions.push({ label: `Group ${displayKey}`, value: key });
        }
      }
    },
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
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.request-submit {
  max-width: 830px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
  padding: 20px 40px;
  background-color: #f0f5fa;
  border: 1px solid #e4eff8;
  border-radius: 5px;
  .btn {
    width: 160px;
    height: 45px;
  }
}
.form-group.form-check {
  margin-bottom: 0;
}

.form-container {
  margin-left: auto;
  margin-right: auto;
  &.technical-sec {
    position: relative;
    margin-top: 70px;
  }
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
.image-container::v-deep {
  img {
    max-width: 100%;
  }
}
.btns-container {
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .mobile-delete-btn {
    color: #d83436;
    border: 1px solid #d83436;
    @include h.appDirAuto($margin-start: 20px);
  }
}
.nav-btns {
  position: absolute;
  top: 0;
  left: 30px;
  transform: translateY(-100%);
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  .tab-btn {
    background-color: #e4e6eb;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    z-index: 2;
    padding: 0.5rem 1rem;
    border-top: 1px solid lightgray;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
    &.active {
      background-color: white;
    }
  }
  .new-tab {
    @include h.appDirAuto(
      $border-top-start-radius: 0,
      $border-bottom-start-radius: 0,
      $border-bottom-end-radius: 0,
      $margin-start: -2px
    );
    z-index: 1;
  }
  .btn {
    position: relative;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: none !important;
    outline: none !important;
  }
  .delete-btn {
    position: relative;
    z-index: 10;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
    width: 18px;
    height: 18px;
    padding: 0;
    border-radius: 0;
    color: black;
    background-color: #cfcfcf;
    @include h.appDirAuto($margin-start: 10px);
  }
}
</style>
