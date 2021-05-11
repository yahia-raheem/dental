<template>
  <section class="home-steps">
    <div class="shapes bs-cloud">
      <get-img imgid="13" fit="contain" responsive="xs:200px sm:200px md:200px lg:600px xl:600px xxl:600px" />
    </div>
    <div class="shapes be-cloud">
      <get-img imgid="12" fit="contain" responsive="xs:100px sm:100px md:200px lg:300px xl:300px xxl:300px" />
    </div>
    <div class="curve">
      <get-img imgid="37" fit="contain" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="sec-title">{{ secTitle }}</h2>
          <h2 class="sec-subtitle">
            <span class="word" v-for="(word, key) in subArr" :key="key">{{
              word
            }}</span>
          </h2>
        </div>
      </div>
      <div class="row mb-5">
        <div
          class="col-lg-4 col-md-6 col-sm-12 mb-3 d-flex justify-content-center align-items-center"
          v-for="(item, key) in labGroup"
          :key="key"
        >
          <div class="step-box shadow-sm">
            <get-img
              :imgid="item.logo"
              :size="'thumbnail'"
              responsive="xxl:120px"
              classes="logo"
            />
            <h5 class="title">{{ item.Title }}</h5>
            <p class="description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      subArr: []
    };
  },
  props: {
    labGroup: {
      type: Array,
      default() {
        return [];
      },
      required: true
    },
    secTitle: {
      type: String,
      required: true
    },
    secSubtitle: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.subArr = this.secSubtitle.split(" ");
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
section.home-steps {
  @include h.curve("top", 260px, 992px);
  background-color: #f5f9fa;
  @include h.media(">992") {
    padding-top: 0;
  }
  .curve {
    top: -258px;
    picture {
      width: 100%;
    }
  }
  .shapes {
    position: absolute;
    display: none;
    &.bs-cloud {
      bottom: 0;
      @include h.appDirAuto($start: 10px);
    }
    &.be-cloud {
      bottom: 0;
      @include h.appDirAuto($end: 0);
    }
    @include h.media(">992px") {
      display: block;
    }
  }
  .sec-title,
  .sec-subtitle {
    text-align: center;
    color: #4b6b83;
    position: relative;
    margin-bottom: 10px;
    @include h.media(">992px") {
      top: -100px;
    }
  }
  .sec-title {
    font-size: 1.5rem;
    @include h.media(">992px") {
      font-size: 2rem;
    }
  }
  .sec-subtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
    .word {
      @include h.appDirAuto($margin-end: 10px);
      font-weight: 900;
      text-shadow: 2px 3px 0px #64646421;
      font-size: 2.3rem;
      &:last-of-type {
        color: #47bcc8;
      }
    }
    @include h.media(">992px") {
      margin-bottom: 0;
      .word {
        font-size: 2.7rem;
      }
    }
  }
  .step-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    align-items: center;
    margin: 0;
    width: 320px;
    min-height: 320px;
    background-color: white;
    border-radius: 10px;
    .title,
    .description {
      text-align: center;
    }
    .title {
      color: #606060;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .description {
      color: h.$body-color;
    }
    .logo {
      margin-bottom: 20px;
    }
  }
}
</style>
