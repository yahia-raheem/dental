<template>
  <section class="doctor-profile page internal">
    <div class="profile-header">
      <nuxt-link to="dashboard/edit" class="clickable-image" append></nuxt-link>
      <div
        :class="{ notice: true, pending: docProfStatus == 'pending' }"
        v-if="docProfStatus != null && docProfStatus != true"
      >
        <p v-if="docProfStatus == 'pending'">
          you've uploaded your identification id. we will check it and get back
          to you as soon as possible
        </p>
        <p v-if="docProfStatus != 'pending'">
          Please verify your profile as soon as possible to fully enjoy our
          platform's services.
          <nuxt-link
            :to="
              `/doctors/${$auth.user.doctor_profile.id}/dashboard/edit#verificationBox`
            "
            class="verify-link"
            >Click here</nuxt-link
          >
        </p>
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
              :title="doctor.name"
              :description="doctor.description"
              :tags="tags"
              :logoImg="doctor.picture"
              :cta="{
                link: `/doctors/${doctor.id}/dashboard/edit`,
                text: 'View Dashboard'
              }"
              v-if="myProfile"
            />
            <profile-intro
              :title="doctor.name"
              :description="doctor.description"
              :tags="tags"
              :logoImg="doctor.picture"
              v-if="!myProfile"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-12">
            <div class="profile-box about" v-if="doctor.about != null">
              <div class="header">
                <h5 class="title">About {{ doctor.name }}</h5>
              </div>
              <p>
                {{ doctor.about }}
              </p>
            </div>
            <div
              class="profile-box experience"
              v-if="doctor.experience != null && doctor.experience.length > 0"
            >
              <div class="header">
                <h5 class="title">Experience & Qualifications</h5>
              </div>
              <ul class="enq-list">
                <li v-for="(item, index) in doctor.experience" :key="index">
                  <span class="icon">
                    <get-svg :svgid="98" />
                  </span>
                  <span class="content">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-8 col-md-12" v-if="doctor.availability != null">
            <div class="profile-box availability">
              <div class="header">
                <h5 class="title">Availability</h5>
              </div>
              <ul>
                <li>
                  <availability-check
                    :active="checkIfavailable('Full Time')"
                    :text="'Full Time'"
                  />
                </li>
                <li>
                  <availability-check
                    :active="checkIfavailable('Part Time')"
                    :text="'Part Time'"
                  />
                </li>
                <li>
                  <availability-check
                    :active="checkIfavailable('Daily')"
                    :text="'Daily'"
                  />
                </li>
                <li>
                  <availability-check
                    :active="checkIfavailable('Freelance')"
                    :text="'Freelance'"
                  />
                </li>
                <li>
                  <availability-check
                    :active="checkIfavailable('Consultation')"
                    :text="'Consultation'"
                  />
                </li>
              </ul>
            </div>
            <div class="profile-box portfolio" v-if="doctor.portfolio != null">
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
                        :rating="rating"
                        :increment="0.5"
                        :show-rating="false"
                        :read-only="true"
                        :star-size="23"
                        :glow="1"
                      ></star-rating>
                      <span>{{ rating }} out of 5</span>
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
import ProfileIntro from "~/components/profiles/ProfileIntro.vue";
import PopSlide from "~/components/profiles/PopSlide.vue";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mapGetters } from "vuex";

export default {
  components: {
    AvailabilityCheck,
    PortfolioSlide,
    ProfileComment,
    ProfileIntro,
    PopSlide
  },
  async asyncData(context) {
    const doctor = await context.store.dispatch(
      "doctors/getDocById",
      context.params.id
    );
    context.store.dispatch("pages/setTitle", doctor.name);
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
  computed: {
    ...mapGetters({
      doctor: "doctors/currDoc"
    }),
    tags() {
      return {
        tags: this.doctor.specialties,
        routeName: "doctors",
        queryName: "specialities"
      };
    },
    myProfile() {
      if (this.$auth.user && this.doctor.user_id == this.$auth.user.id) {
        return true;
      } else {
        return false;
      }
    },
    docProfStatus() {
      if (this.loggedIn && this.myProfile) {
        if (this.$auth.user.doctor_profile.status != 1) {
          if (this.$auth.user.doctor_profile.identification != null) {
            return "pending";
          }
          return false;
        }
        return true;
      } else {
        return null;
      }
    },
    portfolioSlides() {
      var R = [];
      for (var i = 0; i < this.doctor.portfolio.length; i += 6)
        R.push(this.doctor.portfolio.slice(i, i + 6));
      return R;
    },
    profileCover() {
      if (this.doctor.cover != null) {
        return `${process.env.storageBase}/${this.doctor.cover}`;
      } else {
        return "/images/Group-572.png";
      }
    }
  },
  methods: {
    closePop() {
      this.pSliderOpened = false;
    },
    openSlider(id) {
      const album = this.doctor.portfolio.find(album => album.id == id);
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
    },
    checkIfavailable(text) {
      return this.doctor.availability.includes(text) ? true : false;
    }
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.notice {
  background-color: #c11515;
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 8px;
  font-weight: 600;
  &.pending {
    background-color: h.$secondary;
  }
  .verify-link {
    text-decoration: underline;
    font-weight: bold;
  }
}
</style>
