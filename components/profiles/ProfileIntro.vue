<template>
  <div class="intro shadow-sm">
    <div class="row">
      <div
        class="col-12 d-flex justify-content-start align-items-start desktop"
        v-if="!isMobile"
      >
        <div class="profile-image">
          <div class="img-container">
            <nuxt-link
              to="dashboard/edit"
              class="clickable-image"
              v-if="myprofile"
              append
            ></nuxt-link>
            <get-img-by-link
              :imglink="profilePicture"
              classes="bg-image"
              responsive="xxl:210px"
            />
          </div>
        </div>
        <div class="intro-data">
          <div class="body">
            <div class="data">
              <h4 class="title">
                {{ title }}
              </h4>

              <div class="tags">
                <nuxt-link
                  :to="{
                    name: tags.routeName,
                    query: { [tags.queryName]: `${spec.id}` }
                  }"
                  class="tag btn"
                  v-for="(spec, key) in tags.tags"
                  :key="key"
                  >{{ spec.name }}</nuxt-link
                >
              </div>
              <p class="desc">
                {{ description }}
              </p>
            </div>
            <div class="cta" v-if="cta">
              <nuxt-link :to="cta.link" class="btn btn-primary">{{
                cta.text
              }}</nuxt-link>
              <span v-if="ptype == 'lab' && $auth.user == null" class="note"
                >Your account must be verified to be able to send request</span
              >
            </div>
          </div>
          <hr />
          <!-- <div class="suffix">
            <client-only>
              <div class="intro-rating">
                <div class="value shadow-sm">
                  {{ rating }}
                </div>
                <star-rating
                  :rating="rating"
                  :increment="0.5"
                  :show-rating="false"
                  :read-only="true"
                  :star-size="23"
                  :glow="1"
                ></star-rating>
                <div class="review-count">( {{ reviews }} Reviews)</div>
              </div>
              <div class="profile-views">
                <get-svg :svgid="87" />
                <span class="views">{{ views }} Views</span>
              </div>
            </client-only>
          </div> -->
        </div>
      </div>
      <div class="col-12 mobile" v-if="isMobile">
        <div class="row">
          <div
            class="col-12 mb-3 d-flex justify-content-center align-items-center flex-wrap"
          >
            <div class="profile-image">
              <div class="img-container">
                <get-img-by-link
                  :imglink="profilePicture"
                  classes="bg-image"
                  responsive="xxl:210px"
                />
              </div>
            </div>
            <div class="header-data">
              <h4 class="title">
                {{ title }}
              </h4>
              <p class="desc">
                {{ description }}
              </p>
              <div class="cta" v-if="cta">
                <nuxt-link :to="cta.link" class="btn btn-primary">{{
                  cta.text
                }}</nuxt-link>
                <span v-if="ptype == 'lab' && $auth.user == null" class="note"
                  >Your account must be verified to be able to send request</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="intro-data">
              <div class="body">
                <div class="data">
                  <div class="tags">
                    <nuxt-link
                      :to="{
                        name: tags.routeName,
                        query: { [tags.queryName]: `${spec.id}` }
                      }"
                      class="tag btn"
                      v-for="(spec, key) in tags.tags"
                      :key="key"
                      >{{ spec.name }}</nuxt-link
                    >
                  </div>
                </div>
              </div>
              <hr />
              <!-- <div class="suffix">
                <client-only>
                  <div class="intro-rating">
                    <div class="value shadow-sm">
                      {{ rating }}
                    </div>
                    <star-rating
                      :rating="rating"
                      :increment="0.5"
                      :show-rating="false"
                      :read-only="true"
                      :star-size="23"
                      :glow="1"
                    ></star-rating>
                    <div class="review-count">( {{ reviews }} Reviews)</div>
                  </div>
                  <div class="profile-views">
                    <get-svg :svgid="87" />
                    <span class="views">{{ views }} Views</span>
                  </div>
                </client-only>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    logoImg: null,
    title: "",
    description: "",
    myprofile: false,
    tags: {},
    // rating: 0,
    // views: "",
    cta: {},
    // reviews: 0,
    ptype: {
      type: String,
      default: "doctor"
    }
  },
  data() {
    return {
      tagQueryName: this.tags.queryName,
      isMobile: this.$store.getters["general/isMobile"]
    };
  },
  computed: {
    currUser() {
      return this.$auth.user;
    },
    profilePicture() {
      if (this.logoImg != null) {
        return `${process.env.storageBase}/${this.logoImg}`;
      } else {
        return "/images/Group-571.png";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.note {
  display: flex;
  width: 250px;
  padding: 10px;
  text-align: center;
  border: 2px solid #d0d0d0;
  border-radius: 10px;
  color: #999999;
  margin-top: 10px;
}
.intro {
  padding: 30px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 30px;
  .title {
    color: h.$primary;
  }
  .profile-image {
    @include h.appDirAuto($margin-end: 20px);
  }
  .btn-primary {
    width: 250px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
  .desktop {
    .profile-image {
      width: 210px;
      .img-container {
        border-radius: 10px;
        @include h.box-ratio(1, 1);
      }
    }
  }
  .intro-data {
    width: 100%;
    .body {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .data {
        @include h.appDirAuto($margin-end: 50px);
      }
      .cta {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
      }
    }
    .tags {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
      flex-wrap: wrap;
      .tag {
        background-color: #efefef;
        color: h.$primary;
        font-size: 0.9rem;
        margin: 5px;
      }
    }
  }
  .intro-rating {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .value {
      background-color: #ffd161;
      margin-top: 5px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      @include h.appDirAuto($margin-end: 15px);
      font-size: 0.8rem;
    }
    .review-count {
      margin-top: 5px;
      @include h.appDirAuto($margin-start: 10px);
    }
  }
  .mobile {
    .profile-image {
      width: 120px;
      margin-bottom: 10px;
      .img-container {
        @include h.circle(120px);
        overflow: hidden;
        border: 1px solid lightgray;
      }
    }
    .title,
    .desc {
      text-align: center;
    }
    .cta {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .btn-primary {
      margin-top: 10px;
    }
    .intro-rating {
      @include h.appDirAuto($margin-end: 25px);
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    .intro-data {
      .body {
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        & > * {
          margin-bottom: 10px;
          margin-left: 0;
          margin-right: 0;
        }
      }
      .tags {
        margin-bottom: 0;
        justify-content: center;
      }
      .suffix {
        justify-content: center;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
