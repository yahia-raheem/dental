<template>
  <section class="lab-profile page internal">
    <div class="profile-header">
      <nuxt-link to="dashboard/edit" class="clickable-image" v-if="loggedIn && user.id == lab.user_id" append></nuxt-link>
      <div class="notice" v-if="lab.status != 1">
        Your Lab has not been verified yet!..please wait for us to review your
        lab
      </div>
      <get-img-by-link
        :imglink="profileCover"
        classes="bg-image"
        responsive="xxl:100vw"
      />
    </div>
    <div class="profile-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <profile-intro
              :title="lab.name"
              :tags="tags"
              :logoImg="lab.picture"
              :cta="{
                link: `/labs/${lab.id}/dashboard/edit`,
                text: 'View Dashboard'
              }"
              ptype="lab"
              :myprofile="loggedIn && user.id == lab.user_id"
              v-if="loggedIn && user.id == lab.user_id"
            />
            <profile-intro
              :title="lab.name"
              :tags="tags"
              :logoImg="lab.picture"
              ptype="lab"
              :myprofile="loggedIn && user.id == lab.user_id"
              :cta="{ link: `/labs/${lab.id}/request`, text: 'Send a Request' }"
              v-if="!loggedIn || user.id != lab.user_id"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-12">
            <div
              class="profile-box about"
              v-if="lab.about != null && lab.about != ''"
            >
              <div class="header">
                <h5 class="title">About</h5>
              </div>
              <p>
                {{ lab.about }}
              </p>
            </div>
            <div class="profile-box price-list" v-if="lab.price_list != null">
              <div class="header">
                <h5 class="title">Price List</h5>
                <a
                  class="pdf btn btn-secondary"
                  v-if="lab.lab_file != null"
                  :href="profileFile"
                  target="_blank"
                >
                  Download Pdf
                </a>
              </div>
              <price-list
                v-for="(item, index) in lab.price_list"
                :key="index"
                :title="item.name"
                :subList="item.sub"
                :forceActive="index == 0"
              />
            </div>
          </div>
          <div class="col-lg-8 col-md-12">
            <div class="locations shadow-sm">
              <h6 class="box-title text-center position-relative">Locations</h6>
              <div class="locations-list">
                <div
                  class="loc"
                  v-for="(item, key) in lab.locations"
                  :key="key"
                >
                  <div class="icon">
                    <get-svg-2 svg="pin" width="11" height="11" />
                  </div>
                  <div class="label">{{ item.name }}</div>
                </div>
              </div>
              <div class="footer" v-if="lab.social_profiles != null">
                <div class="social">
                  <a
                    :href="item.link"
                    class="social_link"
                    v-for="(item, index) in socialLinks"
                    :key="index"
                    target="_blank"
                  >
                    <div class="unit">
                      <get-svg-2 :svg="item.icon" width="12" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="profile-box portfolio" v-if="lab.portfolio != null">
              <div
                class="header d-flex justify-content-between align-items-start"
              >
                <h5 class="title">Portfolio</h5>
                <div
                  class="slider-navigation d-flex justify-content-center align-items-center"
                >
                  <button class="prev" @click="prevSlide">
                    <get-svg-2 svg="left-arrow" />
                  </button>
                  <button class="next" @click="nextSlide">
                    <get-svg-2 svg="right-arrow" />
                  </button>
                </div>
              </div>
              <div class="slider-container">
                <VueSlickCarousel v-bind="settings" ref="portfolioSlider">
                  <div
                    class="slide"
                    v-for="(item, index) in portfolioSlides"
                    :key="index"
                  >
                    <portfolio-slide
                      :slide="item"
                      v-on:openSlider="openSlider"
                    />
                  </div>
                </VueSlickCarousel>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="row">
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
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <modal
      name="portfolioSlider"
      classes="portfolio-slider"
      :adaptive="true"
      :width="'90%'"
      :height="'75%'"
      :maxWidth="1200"
    >
      <VueSlickCarousel
        v-bind="popUpSettings"
        ref="popupSlider"
        :key="popSliderKey"
      >
        <div class="slide" v-for="(item, index) in pSliderSlides" :key="index">
          <pop-slide :slide="item" />
        </div>
      </VueSlickCarousel>
    </modal>
  </section>
</template>
<script>
import AvailabilityCheck from "~/components/doctors/AvailabilityCheck.vue";
import PortfolioSlide from "~/components/doctors/PortfolioSlide.vue";
import ProfileComment from "~/components/doctors/ProfileComment";
import PriceList from "~/components/labs/PriceList.vue";
import ProfileIntro from "~/components/profiles/ProfileIntro.vue";
import PopSlide from "~/components/profiles/PopSlide.vue";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mapGetters } from "vuex";

export default {
  components: {
    AvailabilityCheck,
    PortfolioSlide,
    ProfileComment,
    PriceList,
    ProfileIntro,
    PopSlide
  },
  async asyncData(context) {
    await context.store.dispatch("labs/getLabById", context.params.id);
    return {
      user: context.$auth.user,
      loggedIn: context.$auth.loggedIn,
      settings: {
        dots: false,
        arrows: false,
        autoplay: false
      },
      popUpSettings: {
        arrows: true,
        autoplay: false,
        dots: false,
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      },
      pSliderOpened: false,
      pSliderSlides: [],
      popSliderKey: 0
    };
  },
  mounted() {
    this.$store.dispatch("pages/setTitle", this.lab.name);
  },
  methods: {
    closePop() {
      this.pSliderOpened = false;
    },
    openSlider(id) {
      const album = this.lab.portfolio.find(album => album.id == id);
      if (typeof album.album != "undefined") {
        // this.popSliderKey = this.popSliderKey + 1;
        this.pSliderSlides = album.album;
        this.$modal.show("portfolioSlider");
      }
    },
    prevSlide() {
      this.$refs.portfolioSlider.prev();
    },
    nextSlide() {
      this.$refs.portfolioSlider.next();
    }
  },
  computed: {
    ...mapGetters({
      lab: "labs/currLab"
    }),
    tags() {
      return {
        tags: this.lab.specialties,
        routeName: "labs",
        queryName: "specialities"
      };
    },
    profileCover() {
      if (this.lab.cover != null) {
        return `${process.env.storageBase}/${this.lab.cover}`;
      } else {
        return "/images/Group-572.png";
      }
    },
    portfolioSlides() {
      var R = [];
      for (var i = 0; i < this.lab.portfolio.length; i += 6)
        R.push(this.lab.portfolio.slice(i, i + 6));
      return R;
    },
    profileFile() {
      if (this.lab.lab_file != null) {
        return `${process.env.storageBase}/${this.lab.lab_file}`;
      }
    },
    socialLinks() {
      if (this.lab.social_profiles != null) {
        const socials = [];
        for (const key in this.lab.social_profiles) {
          if (Object.hasOwnProperty.call(this.lab.social_profiles, key)) {
            const element = this.lab.social_profiles[key];
            var icon;
            switch (key) {
              case "facebook":
                icon = "facebook";
                break;
              case "twitter":
                icon = "twitter";
                break;
              case "linked_in":
                icon = "linkedin";
                break;
              default:
                icon = "facebook";
                break;
            }
            socials.push({
              icon: icon,
              link: element
            });
          }
        }
        return socials;
      } else {
        return null;
      }
    }
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
section.lab-profile {
  .notice {
    background-color: red;
    position: absolute;
    z-index: 2;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 8px;
    font-weight: 600;
  }
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
        .icon {
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
        .unit {
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
}
</style>
