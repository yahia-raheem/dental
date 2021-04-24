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
      details: ""
    };
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
</style>
