<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="title">Experience & qualifications</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row" v-for="(item, index) in experience" :key="index">
          <div class="form-group col-lg-10 coll-12">
            <input
              type="text"
              class="form-control"
              @input="changeItem($event, index)"
              :value="item"
              placeholder="Experience and Qualifications"
            />
          </div>
          <div
            class="form-group col-4 col-md-2 d-flex justify-content-start align-items-center"
          >
            <button
              class="btn add-item"
              v-if="index == experience.length - 1"
              @click.prevent="addItem()"
              :key="index"
            >
              <get-svg :svgid="111" width="11" height="11" />
            </button>
            <button
              class="btn remove-item"
              v-if="experience.length > 1"
              @click.prevent="removeItem(index)"
              :key="index + 1"
            >
              <get-svg :svgid="112" width="12" height="12" />
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
</template>

<script>
export default {
  props: {
    doctor: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      experience: [""]
    };
  },
  created() {
    if (this.doctor.experience != null && this.doctor.experience.length > 0) {
      this.experience =  this.doctor.experience;
    }
  },
  methods: {
    addItem() {
      this.experience.push("");
    },
    removeItem(index) {
      this.experience.splice(index, 1);
    },
    changeItem(e, i) {
      this.experience[i] = e.target.value;
    },
    submit() {
      this.experience = this.experience.filter(i => {
        if (i != null && i != "") {
          return true;
        }
      });
      const data = {
        docId: this.doctor.id,
        data: {
          experience: this.experience
        }
      };
      this.$store
        .dispatch("doctors/updateDoc", data)
        .then(result => {
          this.$vToastify.success({
            body: "Profile Updated Successfully",
            title: "Success"
          });
          this.$router.go();
        })
        .catch(err => {
          if (err.response.status < 500) {
            for (const key in err.response.data.errors) {
              if (Object.hasOwnProperty.call(err.response.data.errors, key)) {
                const element = err.response.data.errors[key];
                this.$vToastify.error({ body: element[0] });
              }
            }
          } else {
            this.$vToastify.error({
              body: "An unknown error occured",
              title: "Error"
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.form-row.group {
  position: relative;
  border: 1px solid #f0f0f0;
  padding-top: 25px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  .row-label {
    position: absolute;
    background-color: white;
    z-index: 5;
    top: 0;
    transform: translateY(-50%);
    @include h.appDirAuto($start: 15px);
    font-size: 0.9rem;
    padding: 0 15px;
    font-weight: bold;
  }
  .list-label {
    font-size: 0.9rem;
    font-weight: bold;
  }
}
.add-group {
  background-color: #565656;
  color: white;
}
.remove-group {
  @include h.appDirAuto($margin-end: 15px);
  color: #d8072d;
}
.add-item::v-deep {
  background-color: h.$primary;
  @include h.appDirAuto($margin-end: 5px);
  svg path {
    fill: white;
  }
}
.remove-item::v-deep {
  background-color: #d8072d;
  svg {
    polygon {
      fill: white;
    }
    path {
      fill: white;
    }
  }
}
.add-item,
.remove-item {
  width: 25px;
  height: 25px;
  padding: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
}
</style>
