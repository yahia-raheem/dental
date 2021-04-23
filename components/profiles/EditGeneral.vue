<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="title">Profile Details</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row">
          <div class="form-group col">
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
          <div class="form-group col">
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
          <div class="form-group col">
            <label for="labName" class="form-label">Lab Name</label>
            <input
              type="text"
              class="form-control"
              id="labName"
              v-model.trim="labName"
              placeholder="Lab Name"
            />
          </div>
          <div class="form-group col">
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
              v-model.trim="labAbout"
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
export default {
  props: {
    image: {
      type: String,
      default: null
    },
    cover: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    pdf: {
      type: String,
      default: null
    },
    about: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      labName: "",
      labAbout: "",
    };
  },
  methods: {
    profileImage(e) {
      this.changeImage(e.target.files[0].name);
    },
    profileCover(e) {
      this.changeCover(e.target.files[0].name);
    },
    pdfFile(e) {
      this.changePdf(e.target.files[0].name);
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
