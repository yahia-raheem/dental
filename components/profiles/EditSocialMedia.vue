<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="title">Socail Media</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row" v-for="(item, key) in inputs" :key="key">
          <div class="form-group col-lg-3 col-md-12">
            <v-select
              id="smp"
              v-model.trim="item.label"
              :options="socialOptions"
              placeholder="Social Media Platform"
              :multiple="false"
            ></v-select>
          </div>
          <div class="form-group col-lg-6 col-md-12">
            <input
              type="url"
              class="form-control"
              id="link"
              v-model.trim="item.link"
              placeholder="Link"
            />
          </div>
          <div
            class="form-group col-3 col-md-2 d-flex justify-content-start align-items-center"
          >
            <button
              class="btn add-item"
              @click.prevent="addItem()"
              :key="key"
              v-if="key == inputs.length - 1"
            >
              <!-- <get-svg :svgid="111" width="11" height="11" /> -->
              <get-svg-2 svg="plus" width="11" height="11" />
            </button>
            <button
              class="btn remove-item"
              @click.prevent="removeItem(key)"
              :key="key + 1"
            >
              <!-- <get-svg :svgid="112" width="12" height="12" /> -->
              <get-svg-2 svg="delete" width="12" height="12" />
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
import { titleCase } from "~/plugins/js/components/helper-funcs";
export default {
  props: {
    labSocial: {
      type: Object,
      default() {
        return {};
      }
    },
    labId: {
      required: true
    }
  },
  data() {
    return {
      socialOptions: ["Facebook", "Linked In", "Twitter"],
      inputs: []
    };
  },
  mounted() {
    for (const key in this.labSocial) {
      if (Object.hasOwnProperty.call(this.labSocial, key)) {
        const element = this.labSocial[key];
        const keyClean = titleCase(key.replace(/_/g, " "));
        this.inputs.push({
          label: keyClean,
          link: element
        });
      }
    }
    if (this.inputs.length == 0) {
      this.inputs.push({
        label: null,
        link: null
      });
    }
  },
  created() {
    this.$parent.$on("saveAll", () => {
      this.submit();
    });
  },
  methods: {
    addItem() {
      this.inputs.push({ label: null, link: null });
    },
    removeItem(key) {
      this.inputs.splice(key, 1);
    },
    submit() {
      const i = {};
      this.inputs.forEach((item, index) => {
        if (item.label != null && item.link != null) {
          const labelClean = item.label
            .trim()
            .toLowerCase()
            .replace(/ /g, "_");
          i[labelClean] = item.link;
        } else {
          this.inputs.splice(index, 1);
        }
      });
      const data = { labId: this.labId, data: { social_profiles: i } };
      this.$store
        .dispatch("labs/updateLab", data)
        .then(_ => {
          this.$vToastify.success({
            body: "Social meedia has been updated",
            title: "Success"
          });
          // this.$router.go();
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
