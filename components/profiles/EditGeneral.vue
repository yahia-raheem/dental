<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="title">Profile Details</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row">
          <div class="form-group col">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="profileImage"
                @change="profileImage"
                accept="image/*"
                ref="image"
              />
            </div>
          </div>
          <div class="form-group col">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="coverImage"
                @change="coverImage"
                accept="image/*"
                ref="cover"
              />
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
    image: {
      type: String,
      default: null,
    },
    cover: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    pdf: {
      type: String,
      default: null,
    },
    about: {
      type: String,
      default: null,
    },
  },
  methods: {
    coverImage(e) {
      console.log(e.target.files);
    },
    profileImage(e) {
      console.log(e.target.files);
    },
    async submit() {
      // let formData = new FormData();
      // formData.append("file", this.photo);
      // let url = "http://127.0.0.1:3333/upload";
      // let config = {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      // };
      // await this.$axios({
      //   method: "post",
      //   url: url,
      //   data: formData,
      //   config: config,
      // });
    },
  },
  mounted() {
    console.log();
  },
};
</script>

<style>
</style>