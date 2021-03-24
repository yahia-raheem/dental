<template>
  <section class="doctor-profile page internal">
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
                        imgid="93"
                        classes="bg-image"
                        responsive="xxl:210px"
                      />
                    </div>
                  </div>
                  <div class="intro-data">
                    <div class="body">
                      <div class="data">
                        <h4 class="title">
                          Dr. Ali El Tahan Perfection Dental Care Clinic
                        </h4>
                        <div class="tags">
                          <button class="tag btn">Cosmetic Dentistry</button>
                          <button class="tag btn">Restorative Dentist</button>
                          <button class="tag btn">Implantologist</button>
                        </div>
                        <p class="desc">
                          Masters of endodontics, fellowship of laser therapy in
                          dentistry (Aachen University-Germany), 7 years
                          Experience since 2012
                        </p>
                      </div>
                      <div class="cta">
                        <a href="#" class="btn btn-primary">Hire Me</a>
                      </div>
                    </div>
                    <hr />
                    <div class="suffix">
                      <client-only>
                        <div class="doctor-rating">
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
              <h5 class="title">About Dr. Ali</h5>
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
              <h5 class="title">Experience & Qualifications</h5>
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
              <h5 class="title">Availability</h5>
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

export default {
  components: {
    AvailabilityCheck,
    PortfolioSlide,
    ProfileComment
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
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
hr {
  margin-bottom: 0.8rem;
}
section.doctor-profile {
  padding-top: 0;
}
.profile-header {
  overflow: hidden;
  height: 325px;
  position: relative;
}
.profile-body {
  position: relative;
  top: -90px;
}
.suffix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.profile-views::v-deep {
  svg {
    width: 20px;
    height: auto;
    @include h.appDirAuto($margin-end: 10px);
    path {
      fill: h.$primary;
    }
  }
}
.profile-views {
  display: flex;
  justify-content: center;
  align-items: center;
}
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
  .doctor-rating {
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
.profile-box {
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%) !important;
  border-radius: 10px;
  padding: 30px 20px;
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-bottom: 30px;
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10px;
    content: "";
    background-color: #f0f5fa;
  }
  .title {
    position: relative;
    padding-bottom: 20px;
    &::after {
      content: "";
      position: absolute;
      @include h.appDirAuto($start: 0);
      width: 30px;
      height: 4px;
      background-color: h.$primary;
      border-radius: 30px;
      bottom: 0;
    }
  }
  &.experience {
    .enq-list {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin: 0 -20px;
        &:not(:first-of-type) {
          padding: 20px 0;
        }
        &:not(:last-of-type) {
          border-bottom: 2px solid #f0f5fa;
        }
        &:first-of-type {
          padding-bottom: 20px;
          padding-top: 10px;
        }
        .icon::v-deep {
          padding: 0 20px;
          margin-top: 1px;
          svg {
            width: 18px;
            height: auto;
            path {
              fill: #6a6fb6;
            }
          }
        }
      }
    }
  }
  &.availability {
    ul {
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 35px;
      li {
        @include h.appDirAuto($margin-end: 10px);
      }
    }
  }
  &.portfolio {
    .slider-navigation {
      button::v-deep {
        @include h.circle(22px);
        border: 2px solid #bfbfbf;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        position: relative;
        &:first-of-type {
          @include h.appDirAuto($margin-end: 7px);
        }
        svg {
          width: 12px;
          height: auto;
          @include h.center();
          path {
            fill: #bfbfbf;
          }
        }
      }
    }
  }
  &.comments {
    margin-top: 20px;
    .overall {
      padding: 8px 20px;
      background-color: #f5f8ff;
      border-radius: 50px;
      span {
        margin-top: 5px;
        @include h.appDirAuto($margin-start: 10px);
      }
    }
    .comments-count {
      font-size: 0.8rem;
    }
  }
}
</style>
