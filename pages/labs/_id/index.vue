<template>
  <section class="lab-profile page internal">
    <div class="profile-header">
      <get-img imgid="96" classes="bg-image" responsive="xxl:100vw" />
    </div>
    <div class="profile-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <profile-intro
              title="My Lab"
              :tags="tags"
              logoId="29"
              :rating="lab.rating"
              views="24,500"
              reviews="24"
              :cta="{ link: '/', text: 'Send a Request' }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-12">
            <div class="profile-box about">
              <div class="header">
                <h5 class="title">About</h5>
              </div>
              <p>
                3D printed model is the result you're waiting for after
                digitally designing your patients's mock-up
              </p>
            </div>
            <div class="profile-box price-list">
              <div class="header">
                <h5 class="title">Price List</h5>
                <button class="pdf btn btn-secondary">Download Pdf</button>
              </div>
              <price-list title="Ceramic Press" :forceActive="true" />
              <price-list title="Ceramic CAD" />
              <price-list title="Zironia" />
              <price-list title="Feldspathic" />
              <price-list title="Implant abutment" />
              <price-list title="Framework for hybrid restoration / per unit" />
            </div>
          </div>
          <div class="col-lg-8 col-md-12">
            <div class="locations shadow-sm">
              <h6 class="box-title text-center position-relative">Locations</h6>
              <div class="locations-list">
                <div class="loc" v-for="(item, key) in lab.location" :key="key">
                  <div class="icon">
                    <get-svg :svgid="79" width="11" />
                  </div>
                  <div class="label">{{ item }}</div>
                  <div class="desc">Taba street, El-Zagazig</div>
                </div>
              </div>
              <div class="footer">
                <div class="social">
                  <div class="fb unit">
                    <get-svg :svgid="17" width="12" />
                  </div>
                  <div class="ln unit">
                    <get-svg :svgid="15" width="12" />
                  </div>
                  <div class="tw unit">
                    <get-svg :svgid="106" width="12" />
                  </div>
                </div>
              </div>
            </div>
            <div class="profile-box portfolio">
              <div
                class="header d-flex justify-content-between align-items-start"
              >
                <h5 class="title">Portfolio</h5>
                <div
                  class="slider-navigation d-flex justify-content-center align-items-center"
                >
                  <button class="prev" @click="prevSlide">
                    <get-svg :svgid="101" />
                  </button>
                  <button class="next" @click="nextSlide">
                    <get-svg :svgid="100" />
                  </button>
                </div>
              </div>
              <div class="slider-container">
                <VueSlickCarousel v-bind="settings" ref="portfolioSlider">
                  <div class="slide">
                    <portfolio-slide />
                  </div>
                  <div class="slide">
                    <portfolio-slide />
                  </div>
                </VueSlickCarousel>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="profile-box comments">
              <div
                class="header d-flex justify-content-between align-items-start flex-wrap"
              >
                <h5 class="title">Reviews</h5>
                <div
                  class="rating d-flex justify-content-start align-items-center flex-column mb-3"
                >
                  <client-only>
                    <div
                      class="overall d-flex justify-content-center align-items-center flex-wrap"
                    >
                      <star-rating
                        :rating="lab.rating"
                        :increment="0.5"
                        :show-rating="false"
                        :read-only="true"
                        :star-size="23"
                        :glow="1"
                      ></star-rating>
                      <span>{{ lab.rating }} out of 5</span>
                    </div>
                  </client-only>
                  <div class="comments-count">
                    40 customer ratings
                  </div>
                </div>
              </div>
              <profile-comment :data="defaultComment" />
              <profile-comment :data="defaultComment" />
              <profile-comment :data="defaultComment" />
              <profile-comment :data="defaultComment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AvailabilityCheck from "~/components/doctors/AvailabilityCheck.vue";
import PortfolioSlide from "~/components/doctors/PortfolioSlide.vue";
import ProfileComment from "~/components/doctors/ProfileComment";
import PriceList from "~/components/labs/PriceList.vue";
import ProfileIntro from "~/components/profiles/ProfileIntro.vue";

import { mapActions } from "vuex";

export default {
  components: {
    AvailabilityCheck,
    PortfolioSlide,
    ProfileComment,
    PriceList,
    ProfileIntro
  },
  async asyncData(context) {
    const pageData = await context.store.dispatch(
      "pages/setCurrentPage",
      process.env.homepageId
    );
    return {
      page: pageData,
      lab: {},
      settings: {
        dots: false,
        arrows: false,
        autoplay: false
      },
      tags: {},
      defaultComment: {
        rating: 5,
        title: "Highly Recommended",
        author: "Dr. Ali El Tahan Perfection Dental Care Clinic",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, reprehint occaecat cupidatat non proident,sunt in culpa qui officia deserunt mollit anim id est in culpa qui officia deserunt mollit anim id est laborum."
      }
    };
  },
  async fetch() {
    const lab = await this.getLab(this.$route.params.id);
    this.lab = lab;
    this.tags = {
      tags: lab.specialities,
      routeName: "labs",
      queryName: "specialities"
    };
  },
  methods: {
    ...mapActions({
      getLab: "labs/getLab"
    }),
    prevSlide() {
      this.$refs.portfolioSlider.prev();
    },
    nextSlide() {
      this.$refs.portfolioSlider.next();
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.locations {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  overflow: hidden;
  position: relative;
  .box-title {
    font-weight: normal;
    padding-bottom: 15px;
    position: relative;
    &::after {
      @include h.center("h");
      bottom: 0;
      content: "";
      width: 40px;
      height: 3px;
      border-radius: 5px;
      background-color: #d5d5d5;
    }
  }
  .locations-list {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
    flex-flow: wrap;
    .loc {
      width: 50%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      min-width: fit-content;
      flex-wrap: wrap;
      .icon::v-deep {
        @include h.circle(20px);
        position: relative;
        overflow: hidden;
        @include h.appDirAuto($margin-end: 25px);
        &::after {
          content: "";
          width: 100%;
          height: 100%;
          background-color: #3959a8;
          opacity: 0.2;
          top: 0;
          left: 0;
          position: absolute;
        }
        svg {
          @include h.center();
          path {
            fill: #3959a8;
          }
        }
      }
      .label {
        color: #3959a8;
        @include h.appDirAuto($margin-end: 30px);
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .social {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      .unit::v-deep {
        @include h.circle(20px);
        @include h.appDirAuto($margin-end: 10px);
        background-color: #3959a8;
        position: relative;
        svg {
          max-width: 60%;
          max-height: 60%;
          @include h.center();
          path {
            fill: white;
          }
        }
      }
    }
    &::after {
      @include h.center();
      width: 100%;
      height: 100%;
      content: "";
      background-color: #f0f5fa;
      z-index: 0;
    }
  }
}
</style>
