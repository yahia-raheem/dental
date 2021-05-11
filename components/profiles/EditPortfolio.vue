<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="title">Add new Album</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row">
          <div class="form-group col-lg-5 col-md-6">
            <label for="albumName" class="form-label">Album Name</label>
            <input
              type="text"
              class="form-control"
              id="albumName"
              v-model.trim="albumName"
              placeholder="Album Name"
            />
          </div>
          <div class="form-group col-lg-5 col-md-6">
            <label class="form-label">Album Cover</label>
            <div class="custom-file" ref="cover">
              <input
                type="file"
                class="custom-file-input"
                id="albumCover"
                @change="coverChange"
                accept="image/*"
              />
              <label class="custom-file-label" for="albumCover"
                >Choose Image</label
              >
            </div>
          </div>
          <div
            class="form-group col-lg-2 col-md-6 d-flex flex-column justify-content-end align-items-center"
          >
            <button type="submit" class="btn submit-btn">Add New</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    profileType: {
      type: String,
      default: "lab"
    }
  },
  data() {
    return {
      albumName: null,
      albumCover: null
    };
  },
  computed: {
    form() {
      return new FormData();
    }
  },
  methods: {
    coverChange(e) {
      if (e.target.files) {
        this.changeImage(e.target.files[0].name);
        this.albumCover = e.target.files[0];
      }
    },
    clearImage() {
      this.$refs.cover.querySelector("label").innerHTML = "Choose Image";
      this.$refs.cover.classList.remove("dirty");
    },
    changeImage(name) {
      this.$refs.cover.querySelector("label").innerHTML = name;
      this.$refs.cover.classList.add("dirty");
    },
    async submit() {
      this.form.append("title", this.albumName);
      this.form.append("action", "create");
      const formData = new FormData();
      formData.append("image", this.albumCover);
      try {
        var path;
        if (this.profileType != "lab") {
          const data = await this.$store.dispatch("doctors/uploadPortImage", {
            docId: this.$route.params.id,
            data: formData
          });
          path = data.path;
        } else {
          const data = await this.$store.dispatch("labs/uploadPortImage", {
            labId: this.$route.params.id,
            data: formData
          });
          path = data.path;
        }
        this.form.append("cover", path);
        if (this.profileType != "lab") {
          await this.$store.dispatch("doctors/portfolioAction", {
            docId: this.$route.params.id,
            data: this.form
          });
        } else {
          await this.$store.dispatch("labs/portfolioAction", {
            labId: this.$route.params.id,
            data: this.form
          });
        }
        this.$vToastify.success({
          body: "Album added successfully",
          title: "success"
        });
        this.albumName = null;
        this.albumCover = null;
        this.clearImage();
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
  }
};
</script>
<style lang="scss" scoped>
.submit-btn {
  background-color: #505050;
  color: white;
}
</style>
