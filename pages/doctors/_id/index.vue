<template>
  <section class="doctor-profile page internal">
    <div class="profile-header">
      <get-img imgid="96" classes="bg-image" responsive="xxl:100vw" />
    </div>
    <div class="profile-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <profile-intro
              title="Dr. Ali El Tahan Perfection Dental Care Clinic"
              description="Phd in medicine from stanford university Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
              :tags="tags"
              logoId="29"
              :rating="rating"
              views="24,500"
              reviews="24"
              :cta="{link: '/', text: 'Contact Me'}"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="profile-box about">
              <div class="header">
                <h5 class="title">About Dr. Ali</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div class="profile-box experience">
              <div class="header">
                <h5 class="title">Experience & Qualifications</h5>
              </div>
              <ul class="enq-list">
                <li>
                  <span class="icon">
                    <get-svg :svgid="98" />
                  </span>
                  <span class="content"
                    >Masters of Endodontics and microsurgery (Misr International
                    University)</span
                  >
                </li>
                <li>
                  <span class="icon">
                    <get-svg :svgid="98" />
                  </span>
                  <span class="content"
                    >Masters of Endodontics and microsurgery (Misr International
                    University)</span
                  >
                </li>
                <li>
                  <span class="icon">
                    <get-svg :svgid="98" />
                  </span>
                  <span class="content"
                    >Masters of Endodontics and microsurgery (Misr International
                    University)</span
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="col-8">
            <div class="profile-box availability">
              <div class="header">
                <h5 class="title">Availability</h5>
              </div>
              <ul>
                <li>
                  <availability-check :active="true" :text="'Full Time'" />
                </li>
                <li>
                  <availability-check :active="false" :text="'Part Time'" />
                </li>
                <li>
                  <availability-check :active="false" :text="'Daily'" />
                </li>
                <li>
                  <availability-check :active="true" :text="'Freelance'" />
                </li>
                <li>
                  <availability-check :active="true" :text="'consultation'" />
                </li>
              </ul>
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
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AvailabilityCheck from "~/components/doctors/AvailabilityCheck.vue";
import PortfolioSlide from "~/components/doctors/PortfolioSlide.vue";
import ProfileComment from "~/components/doctors/ProfileComment";
import ProfileIntro from "~/components/profiles/ProfileIntro.vue";

export default {
  components: {
    AvailabilityCheck,
    PortfolioSlide,
    ProfileComment,
    ProfileIntro
  },
  async asyncData(context) {
    const pageData = await context.store.dispatch(
      "pages/setCurrentPage",
      process.env.homepageId
    );
    return {
      page: pageData,
      rating: 4.5,
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
      },
      tags: {
        tags: [
          "Cosmetic Dentistry",
          "Restorative Dentist",
          "Implantologist"
        ],
        routeName: "index",
        queryName: "specialities"
      }
    };
  },
  methods: {
    prevSlide() {
      this.$refs.portfolioSlider.prev();
    },
    nextSlide() {
      this.$refs.portfolioSlider.next();
    }
  }
};
</script>
<style lang="scss"></style>
