<template>
  <div class="lab-block shadow-sm">
    <div class="logo">
      <div class="img-container">
        <get-img-by-link
          :imglink="profilePicture"
          responsive="xxl:500px"
          classes="bg-image"
        />
      </div>
    </div>
    <div class="data-container">
      <div class="box-header mb-2">
        <nuxt-link
          :to="{ name: 'labs-id', params: { id: lab.id } }"
          class="lab-link"
        >
          <h6 class="title">{{ lab.name }}</h6>
        </nuxt-link>
        <!-- <client-only>
          <div class="lab-rating">
            <div class="value shadow-sm">
              {{ lab.rating }}
            </div> -->
        <!-- <star-rating
              :rating="lab.rating"
              :increment="0.5"
              :show-rating="false"
              :read-only="true"
              :star-size="18"
              :glow="1"
            ></star-rating>
            <div class="review-count">
              ( 24 Reviews)
            </div> 
          </div>
        </client-only> 
        <div class="spacer"></div>
        <div class="profile-views">
          <get-svg :svgid="87" width="18" />
          <span class="views">34,643 Views</span>
        </div> -->
      </div>
      <div class="spec-tags">
        <button
          class="tag btn"
          v-for="(item, key) in lab.specialties"
          :key="key"
          @click="specFilter(item.id)"
        >
          {{ item.name }}
        </button>
      </div>
      <div class="location">
        <get-svg :svgid="79" width="18" />
        <span class="text">{{ lab.locations | stringify }}</span>
      </div>
      <hr />
      <div
        class="footer d-flex justify-content-between align-items-center w-100"
      >
        <button class="btn profile-cta">
          <span class="icon">
            <get-svg :svgid="105" width="10" />
          </span>
          <span class="text">View Profile</span>
        </button>
        <button class="btn btn-primary">Send Request</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lab: {
      type: Object
    }
  },
  filters: {
    stringify(v) {
      var locations = "";
      v.forEach(element => {
        locations = locations.concat(element.name);
        locations = locations.concat(", ");
      });
      locations = locations.slice(0, -2);
      return locations;
    }
  },
  computed: {
    profilePicture() {
      if (this.lab.picture != null) {
        return `${process.env.storageBase}/${this.lab.picture}`;
      } else {
        return "/images/Profile_avatar_placeholder_large.png";
      }
    }
  },
  methods: {
    specFilter(id) {
      this.$emit("filterSpec", [id]);
      // const value = event.target.outerText.trim().toLowerCase();
      // var oldSpec =
      //   typeof this.$route.query.specialities != "undefined"
      //     ? this.$route.query.specialities
      //     : "";
      // const oldSpecArr = oldSpec.split(",");
      // if (oldSpecArr.includes(value)) {
      //   const specIndex = oldSpecArr.indexOf(value);
      //   oldSpecArr.splice(specIndex, 1);
      //   this.$router.push(
      //     {
      //       query: {
      //         ...this.$route.query,
      //         specialities:
      //           oldSpecArr.length > 0 ? oldSpecArr.join(",") : undefined
      //       }
      //     },
      //     () => {
      //       this.$emit("spec-changed");
      //     }
      //   );
      // } else {
      //   oldSpec = oldSpec != "" ? oldSpec + "," : oldSpec;
      //   this.$router.push(
      //     {
      //       query: {
      //         ...this.$route.query,
      //         specialities: oldSpec + value
      //       }
      //     },
      //     () => {
      //       this.$emit("spec-changed");
      //     }
      //   );
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.profile-views::v-deep {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .views {
    font-size: 0.9rem;
  }
  svg {
    @include h.appDirAuto($margin-end: 5px);
    path {
      fill: h.$primary;
    }
  }
}
.spec-tags {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @include h.media(">600px") {
    justify-content: flex-start;
  }
  .tag {
    background-color: #efefef;
    color: h.$primary;
    font-size: 0.8rem;
    padding: 2px 15px;
    margin: 5px;
    @include h.media(">600px") {
      margin: 0;
      @include h.appDirAuto($margin-end: 10px);
    }
  }
}
.lab-block {
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 20px 10px;
  margin-bottom: 30px;
  flex-direction: column;
  margin-left: -4vw;
  margin-right: -4vw;
  @include h.media(">600px") {
    margin-left: 0;
    margin-right: 0;
    flex-direction: row;
    align-items: flex-start;
  }
  .logo {
    min-width: 120px;
    @include h.appDirAuto($margin-end: 15px);
    margin-bottom: 15px;
    @include h.media(">600px") {
      margin-bottom: 0;
    }
    .img-container {
      @include h.box-ratio(1, 1);
      border: 1px solid #f2f2f3;
      border-radius: 10px;
    }
  }
  .data-container {
    width: stretch;
    .box-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      flex-direction: column;
      @include h.media(">500px") {
        flex-direction: row;
        align-items: flex-start;
      }
      @include h.media(">788px") {
        align-items: center;
        flex-wrap: nowrap;
      }
    }
    .lab-link {
      width: 100%;
      @include h.media(">788px") {
        width: auto;
      }
    }
    .title {
      color: #4b6b83;
      text-align: center;
      @include h.media(">500px") {
        @include h.appDirAuto($text-aling: start);
      }
      @include h.media(">788px") {
        margin-bottom: 0;
      }
    }
    .lab-rating {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
      @include h.media(">788px") {
        @include h.appDirAuto($margin-start: 15px);
        margin-bottom: 0;
      }
      .value {
        background-color: #ffd161;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        @include h.appDirAuto($margin-end: 15px);
        font-size: 0.7rem;
      }
      .review-count {
        @include h.appDirAuto($margin-start: 10px);
        font-size: 0.8rem;
      }
    }
  }
  .location::v-deep {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 8px;
    svg {
      @include h.appDirAuto($margin-end: 10px);
      path {
        fill: #6a6fb6;
      }
    }
    .text {
      font-size: 0.8rem;
      margin-top: 4px;
    }
  }
  hr {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .footer {
    .btn {
      font-size: 0.8rem;
      padding: 4px 20px;
      &.profile-cta::v-deep {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: h.$primary;
        @include h.appDirAuto($padding-start: 0);
        .icon {
          @include h.circle(15px);
          background-color: #6a6eb3;
          display: flex;
          justify-content: center;
          align-items: center;
          @include h.appDirAuto($margin-end: 10px);
          svg {
            path {
              fill: white;
            }
          }
        }
      }
    }
  }
}
</style>
