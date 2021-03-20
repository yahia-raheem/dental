<template>
  <section class="contact-us">
    <div class="container-fluid">
      <div class="row mb-5">
        <div class="col-12">
          <div class="img-container banner">
            <get-img :imgobj="page.meta_box.cta_banner" />
          </div>
          <div class="banner-title">
            <h1 class="text title">{{ page.meta_box.text_eijo7qftqjr }}</h1>
            <h2 class="text subtitle">{{ page.meta_box.banner_subtitle }}</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-12 d-flex justify-content-center mb-4">
          <div class="form-container shadow-sm">
            <h5 class="form-title">SEND YOUR REQUEST</h5>
            <contact-form />
          </div>
        </div>
        <div class="col-lg-8 col-md-12">
          <div
            class="contact-group"
            v-for="(item, index) in page.meta_box.contact_group"
            :key="index"
          >
            <h3 class="title">{{ item.group_title }}</h3>
            <div class="addresses contact-box" v-if="item.addresses">
              <div
                class="unit"
                v-for="(address, index) in item.addresses.address_text_list"
                :key="index"
              >
                <div class="label">
                  <get-svg :svgid="address[2]" />
                  <p>{{ address[0] }}</p>
                </div>
                <div class="value">
                  <p>{{ address[1] }}</p>
                  <a :href="address[3]" target="_blank">View Location on Map</a>
                </div>
              </div>
            </div>
            <div class="phones contact-box" v-if="item.phones">
              <div
                class="unit"
                v-for="(phone, index) in item.phones.phone_text_list"
                :key="index"
              >
                <div class="label">
                  <get-svg :svgid="phone[2]" />
                  <p>{{ phone[0] }}</p>
                </div>
                <div class="value">
                  <p>{{ phone[1] }}</p>
                </div>
              </div>
            </div>
            <div class="emails contact-box" v-if="item.emails">
              <div
                class="unit"
                v-for="(email, index) in item.emails.email_text_list"
                :key="index"
              >
                <div class="label">
                  <get-svg :svgid="email[2]" />
                  <p>{{ email[0] }}</p>
                </div>
                <div class="value">
                  <p>{{ email[1] }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ContactForm from '~/components/contact-us/ContactForm.vue';
export default {
  components: {
    ContactForm
  },
  async asyncData(context) {
    const pageData = await context.store.dispatch(
      "pages/setCurrentPage",
      process.env.contactUs
    );
    return {
      page: pageData
    };
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
section.contact-us {
  background-color: #f5f9fa;
  .banner {
    border-radius: 5px;
    width: 100%;
    height: 400px;
    overflow: hidden;
  }
  .banner-title {
    @include h.center("v");
    @include h.appDirAuto($end: 4vw);
    .text {
      color: white;
      width: 300px;
      font-weight: 600;
      margin: 0;
    }
  }
  .contact-group {
    margin-bottom: 30px;
    padding-bottom: 30px;
    position: relative;
    &:not(:last-of-type)::after {
      content: "";
      bottom: 0;
      left: 0;
      position: absolute;
      @include h.line-wv-dashes(1px, lightgray, 1px);
    }
    .title {
      margin-bottom: 30px;
      font-weight: 700;
      color: h.$primary;
    }
    .contact-box {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      .unit {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        margin-bottom: 20px;
        .label {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 20%;
          min-width: 145px;
          position: relative;
          @include h.appDirAuto($padding-start: 40px);
          .style-svg {
            max-width: 20px;
            max-height: 20px;
            width: auto;
            height: auto;
            path, polygon {
              fill: h.$primary;
            }
            position: absolute;
            @include h.appDirAuto($start: 0);
            top: 5px;
          }
          p {
            font-size: 1.1rem;
          }
        }
        .value {
          width: 80%;
          font-size: 1.1rem;
          p {
            unicode-bidi: plaintext;
          }
          a {
            color: #6890b3;
            margin-top: 5px;
            display: inline-block;
            font-size: 1rem;
            i {
              @include h.appDirAuto($margin-end: 10px);
            }
          }
        }
      }
    }
  }
  .form-container {
    position: relative;
    padding: 30px;
    background-color: white;
    width: 100%;
    @include h.media(">nav-collapse") {
      bottom: 150px;
      max-width: 360px;
    }
    border-radius: 5px;
    .form-title {
      text-align: center;
      margin-bottom: 2rem;
    }
  }
}
</style>
