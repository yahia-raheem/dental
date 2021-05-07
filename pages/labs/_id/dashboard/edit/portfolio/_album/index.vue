<template>
  <div class="row">
    <div class="col-12">
      <h6 class="sub-title">{{ portfolio.title }}</h6>
      <div class="edit-box">
        <div class="header">
          <h6 class="title">Profile Details</h6>
        </div>
        <div class="form-container">
          <form @submit.prevent="submit">
            <div
              class="form-row"
              v-for="(item, index) in portfolio.album"
              :key="index"
            >
              <div class="form-group col-lg-6 col-md-12">
                <label for="groupTitle" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="groupTitle"
                  v-model.trim="item.title"
                  @input="titleChanged($event, index)"
                  placeholder="Title"
                />
              </div>
              <div class="form-group col-lg-6 col-md-12">
                <label class="form-label">Image</label>
                <div class="custom-file" ref="groupImage">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="profileImage"
                    @change="groupImage($event, index)"
                    accept="image/*"
                  />
                  <label class="custom-file-label" for="profileImage"
                    >Choose Image</label
                  >
                </div>
              </div>
              <div class="form-group col-12">
                <label for="profileAbout" class="form-label">Desc</label>
                <textarea
                  class="form-control"
                  v-model.trim="item.description"
                  id="profileAbout"
                  rows="5"
                  placeholder="Desc"
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
    </div>
  </div>
</template>
<script>
export default {
  async asyncData(context) {
    const data = {
      labId: context.params.id,
      data: {
        action: "select",
        id: context.params.album
      }
    };
    const { portfolio } = await context.store.dispatch(
      "labs/portfolioAction",
      data
    );
    if (portfolio.album) {
      if (portfolio.album.length == 0) {
        portfolio.album.push({
          title: null,
          description: null,
          image: null
        });
      }
    } else {
      portfolio["album"] = [
        {
          title: null,
          description: null,
          image: null
        }
      ];
    }
    return {
      portfolio
    };
  },
  computed: {
    form() {
      return new FormData();
    }
  },
  mounted() {
    var linkArr;
    this.portfolio.album.forEach((e, i) => {
      if (e.image) {
        linkArr = e.image.split("/");
        this.changeImage(linkArr[linkArr.length - 1], i);
      }
    });
  },
  methods: {
    titleChanged(e, i) {},
    groupImage(e, i) {
      this.changeImage(e.target.files[0].name, i);
      this.portfolio.album[i].image = e.target.files[0];
    },
    changeImage(name, index) {
      this.$refs.groupImage[index].querySelector("label").innerHTML = name;
      this.$refs.groupImage[index].classList.add("dirty");
    },
    async submit() {
      this.form.append("action", "edit");
      this.form.append("title", this.portfolio.title);
      this.form.append("cover", this.portfolio.cover);
      this.form.append("id", this.portfolio.id);
      for (const i in this.portfolio.album) {
        if (Object.hasOwnProperty.call(this.portfolio.album, i)) {
          const e = this.portfolio.album[i];
          this.form.append(`album[${i}][title]`, e.title);
          this.form.append(`album[${i}][description]`, e.description);
          if (
            typeof e.image != "string" &&
            typeof e.image != "undefined" &&
            e.image != null
          ) {
            const imageForm = new FormData();
            imageForm.append("image", e.image);
            const { path } = await this.$store.dispatch(
              "labs/uploadPortImage",
              {
                labId: this.$route.params.id,
                data: imageForm
              }
            );
            this.form.append(`album[${i}][image]`, path);
          } else {
            this.form.append(`album[${i}][image]`, e.image);
          }
        }
      }
      const data = {
        labId: this.$route.params.id,
        data: this.form
      };
      try {
        const res = await this.$store.dispatch("labs/portfolioAction", data);
        console.log(res);
      } catch (error) {
        console.log(error.response);
      }
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
