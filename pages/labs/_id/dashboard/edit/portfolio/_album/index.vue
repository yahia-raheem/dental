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
              <div
                class="col-12 album-header d-flex justify-content-between align-items-center mb-3"
              >
                <div class="leading">
                  <button
                    class="header btn d-flex justify-content-start align-items-center"
                    @click.prevent="toggleTap(index)"
                  >
                    <div class="icon">
                      <get-svg :svgid="100" width="13" height="13" />
                    </div>
                    <div class="title">
                      {{ item.title }}
                    </div>
                  </button>
                </div>
                <div class="trailing">
                  <button
                    class="delete btn"
                    @click.prevent="deleteGroup(index)"
                  >
                    <get-svg :svgid="112" width="15" height="15" />
                  </button>
                </div>
              </div>
              <div
                :class="{ 'd-none': portfolio.album.length - 1 != index }"
                class="col-12"
                ref="tabBody"
              >
                <div class="row">
                  <div class="form-group col-lg-6 col-md-12">
                    <label for="groupTitle" class="form-label">Title</label>
                    <input
                      type="text"
                      class="form-control"
                      id="groupTitle"
                      v-model.trim="item.title"
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
              </div>
            </div>
            <div class="form-row">
              <div class="col-12 d-flex justify-content-end align-items-center">
                <button class="btn add-group" @click.prevent="addGroup">
                  Add New
                </button>
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
    toggleTap(i) {
      this.$refs.tabBody[i].classList.toggle("d-none");
    },
    groupImage(e, i) {
      this.changeImage(e.target.files[0].name, i);
      this.portfolio.album[i].image = e.target.files[0];
    },
    changeImage(name, index) {
      this.$refs.groupImage[index].querySelector("label").innerHTML = name;
      this.$refs.groupImage[index].classList.add("dirty");
    },
    addGroup() {
      this.portfolio.album.push({
        title: null,
        description: null,
        image: null
      });
    },
    deleteGroup(i) {
      this.portfolio.album.splice(i, 1);
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
        this.$vToastify.success({
          body: "Album edited successfully",
          title: "Success"
        });
      } catch (error) {
        this.$vToastify.error({
          body: "an unknown error occured",
          title: "Error"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.custom-file {
  &.dirty {
    label::after {
      content: "change";
      background-color: #d24c35;
      color: white;
    }
  }
}
button:hover,
button:focus,
button:active {
  box-shadow: none;
  outline: none;
}
.album-header::v-deep {
  width: 100%;
  border-radius: 5px;
  background-color: #f5f5f5;
  .leading {
    button {
      margin: 0;
      border-bottom: 0;
      .icon {
        @include h.appDirAuto($margin-end: 15px);
        @include h.appDirAuto($margin-start: 10px);
      }
      .title {
        margin: 0;
      }
    }
    svg path {
      fill: h.$primary;
    }
  }
  .trailing {
    button {
      background-color: #d5072a;
      padding: 0;
      line-height: 0;
      padding: 5px;
      @include h.appDirAuto($margin-end: 10px);
      svg path,
      svg polygon {
        fill: white;
      }
    }
  }
}
.add-group {
  background-color: #505050;
  color: white;
  margin-bottom: 20px;
  font-size: 0.9rem;
}
</style>
