<template>
  <section class="home-partners">
    <div class="container-fluid">
      <div class="row mb-5">
        <div class="col-12">
          <h2 class="sec-title">{{ secTitle }}</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <client-only>
            <VueSlickCarousel v-bind="settings">
              <div class="slide" v-for="(item, key) in slides" :key="key">
                <get-img :imgid="item.ID" />
              </div>
            </VueSlickCarousel>
          </client-only>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      settings: {
        dots: false,
        arrows: false,
        autoplay: true,
        slidesToShow: 6,
        responsive: [
          {
            breakpoint: 1366,
            settings: {
              slidesToShow: 5
            }
          },
          {
            breakpoint: 1140,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 668,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 444,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    };
  },
  props: {
    secTitle: {
      type: String,
      default: "",
      required: true
    },
    slides: {
      type: Array,
      default() {
        return [];
      },
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
section.home-partners {
  background-color: #eaedef;
  .sec-title {
    text-align: center;
    position: relative;
    color: #4b6b83;
    &::after {
      @include h.center("h");
      bottom: - h.$headings-margin-bottom;
      content: "";
      width: 70px;
      height: 8px;
      border-radius: 15px;
      background-color: h.$secondary;
    }
  }
  .slide::v-deep {
    display: flex !important;
    justify-content: center;
    align-items: center;
    img {
      width: 185px;
      height: auto;
    }
  }
}
</style>
