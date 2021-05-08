<template>
  <section class="doctor-profile page internal">
    <div class="profile-header">
      <nuxt-link to="dashboard/edit" class="clickable-image" append></nuxt-link>
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
                text: 'Dashboard'
              }"
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
    const doctor = await context.store.dispatch(
      "doctors/getDocById",
      context.params.id
    );
    context.store.dispatch("pages/setTitle", doctor.name);
    return {
      doctor,
      user: context.$auth.user,
      loggedIn: context.$auth.loggedIn,
      settings: {
        dots: false,
        arrows: false,
        autoplay: false
      },
      tags: {
        tags: doctor.specialties,
        routeName: "doctors",
        queryName: "specialities"
      }
    };
  },
  computed: {
    profileCover() {
      if (this.doctor.cover != null) {
        return `${process.env.storageBase}/${this.doctor.cover}`;
      } else {
        return "/images/Group 572.png";
      }
    }
  },
  methods: {
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
<style lang="scss"></style>
