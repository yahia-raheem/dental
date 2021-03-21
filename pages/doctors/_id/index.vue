<template>
  <section class="doctor-profile">
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
                            :star-size="25"
                            :glow="1"
                          ></star-rating>
                          <div class="review-count">
                              ( 24 Reviews)
                          </div>
                        </div>
                      </client-only>
                    </div>
                  </div>
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
export default {
  async asyncData(context) {
    const pageData = await context.store.dispatch(
      "pages/setCurrentPage",
      process.env.homepageId
    );
    return {
      page: pageData,
      rating: 4.5
    };
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
section.doctor-profile {
  padding-top: 0;
  background-color: #f5f9fa;
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
.intro {
  padding: 30px;
  background-color: white;
  border-radius: 5px;
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
      .btn {
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
    .title {
      color: h.$primary;
    }
    .desc {
      margin-bottom: 15px;
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
</style>
