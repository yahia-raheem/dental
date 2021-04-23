<template>
  <div class="row">
    <div class="col-12">
      <h6 class="sub-title">Edit Profile</h6>
      <edit-general />
    </div>
  </div>
</template>
<script>
import EditGeneral from "~/components/profiles/EditGeneral.vue";

export default {
  components: { EditGeneral }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.sub-title {
  color: #4b6b83;
  font-size: 1.2rem;
  font-weight: 600;
}
.edit-box::v-deep {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px 30px;
  .header {
    padding: 10px 0;
    border-bottom: 1px dotted #e0e0e0;
    margin-bottom: 20px;
    .title {
      color: h.$primary;
      margin-bottom: 10px;
    }
  }
  input:not([type="search"]),
  .vs__dropdown-toggle,
  .custom-file-label,
  textarea {
    background-color: #f8f9fd;
    box-shadow: none;
    min-height: 40px;
    font-size: 0.9rem;
    &:not(.is-invalid) {
      border: 1px solid #e3eef8;
    }
  }
  .custom-file-label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &::after {
      min-height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .vs__dropdown-toggle {
    input {
      color: #495057;
    }
  }
  .vs__selected {
    border: none;
    background-color: #efefef;
    color: h.$primary;
    padding: 0 0.4em;
    font-size: 0.8rem;
    @include h.appDirAuto($margin-end: 10px);
  }
  .v-select.is-invalid {
    .vs__dropdown-toggle {
      border: 1px solid #dc3545;
    }
  }
  label.form-label {
    color: #505050;
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 10px;
  }
  .form-row {
    .col {
      &:first-of-type {
        @include h.appDirAuto($padding-end: 25px);
      }
      &:last-of-type {
        @include h.appDirAuto($padding-start: 25px);
      }
    }
  }
  .form-group {
    margin-bottom: 20px;
  }
  .cta-container {
    display: flex;
    width: 100%;
    padding: 10px 0;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px dotted #e0e0e0;
    button {
      font-size: 0.8rem;
      padding: 0;
      width: 115px;
      height: 35px;
    }
    p {
      font-size: 0.9rem;
      a {
        color: h.$primary;
      }
    }
  }
}
</style>
