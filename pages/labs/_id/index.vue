<template>
  <section class="lab-profile page internal">
    <div class="profile-header">
      <get-img imgid="96" classes="bg-image" responsive="xxl:100vw" />
    </div>
    <div class="profile-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="intro shadow-sm">
              <div class="row">
                <div
                  class="col-12 d-flex justify-content-start align-items-start"
                >
                  <div class="profile-image">
                    <div class="img-container">
                      <get-img
                        imgid="29"
                        classes="bg-image"
                        responsive="xxl:210px"
                      />
                    </div>
                  </div>
                  <div class="intro-data">
                    <div class="body">
                      <div class="data">
                        <h4 class="title">
                          {{lab.title}}
                        </h4>
                        <div class="tags">
                          <nuxt-link :to="{name: 'labs', query: {specialities: spec.trim().toLowerCase()}}" class="tag btn" v-for="(spec, key) in lab.specialities" :key="key">{{spec}}</nuxt-link>
                        </div>
                      </div>
                      <div class="cta">
                        <a href="#" class="btn btn-primary">Send Request</a>
                      </div>
                    </div>
                    <hr />
                    <div class="suffix">
                      <client-only>
                        <div class="intro-rating">
                          <div class="value shadow-sm">
                            {{ lab.rating }}
                          </div>
                          <star-rating
                            :rating="lab.rating"
                            :increment="0.5"
                            :show-rating="false"
                            :read-only="true"
                            :star-size="23"
                            :glow="1"
                          ></star-rating>
                          <div class="review-count">
                            ( 24 Reviews)
                          </div>
                        </div>
                        <div class="profile-views">
                          <get-svg :svgid="87" />
                          <span class="views">34,643 Views</span>
                        </div>
                      </client-only>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
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
          <div class="col-8">
            <!-- <div class="locations">
              <h6 class="box-title text-center position-relative">Locations</h6>
              <div class="locations-list">
                <div class="loc">

                </div>
              </div>
            </div> -->
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
                class="header d-flex justify-content-between align-items-start"
              >
                <h5 class="title">Reviews</h5>
                <div
                  class="rating d-flex justify-content-start align-items-center flex-column"
                >
                  <client-only>
                    <div
                      class="overall d-flex justify-content-center align-items-center"
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
import { mapActions } from "vuex";

export default {
  components: {
    AvailabilityCheck,
    PortfolioSlide,
    ProfileComment,
    PriceList
  },
  async asyncData(context) {
    const pageData = await context.store.dispatch(
      "pages/setCurrentPage",
      process.env.homepageId
    );
    return {
      page: pageData,
      lab: Object,
      settings: {
        dots: false,
        arrows: false,
        autoplay: false
      },
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
  },
};
</script>
<style lang="scss"></style>
