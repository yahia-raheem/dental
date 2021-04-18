<template>
  <div class="intro shadow-sm">
    <div class="row">
      <div class="col-12 d-flex justify-content-start align-items-start">
        <div class="profile-image">
          <div class="img-container">
            <get-img
              :imgid="logoId"
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
                    query: { [tags.queryName]: spec.trim().toLowerCase() }
                  }"
                  class="tag btn"
                  v-for="(spec, key) in tags.tags"
                  :key="key"
                  >{{ spec }}</nuxt-link
                >
              </div>
              <p class="desc">
                {{ description }}
              </p>
            </div>
            <div class="cta">
              <nuxt-link :to="cta.link" class="btn btn-primary">{{
                cta.text
              }}</nuxt-link>
            </div>
          </div>
          <hr />
          <div class="suffix">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    logoId: "",
    title: "",
    description: "",
    tags: {},
    rating: 0,
    views: "",
    cta: {},
    reviews: 0
  },
  data() {
    return {
      tagQueryName: this.tags.queryName
    };
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.intro {
  padding: 30px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 30px;
  .profile-image {
    width: 210px;
    @include h.appDirAuto($margin-end: 20px);
    .img-container {
      border-radius: 10px;
      @include h.box-ratio(1, 1);
    }
  }
  .intro-data {
    width: 100%;
    .body {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .btn-primary {
        width: 250px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      }
      .data {
        @include h.appDirAuto($margin-end: 50px);
      }
    }
    .tags {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
      .tag {
        background-color: #efefef;
        color: h.$primary;
        font-size: 0.9rem;
        @include h.appDirAuto($margin-end: 10px);
      }
    }
    .title {
      color: h.$primary;
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
}
</style>
