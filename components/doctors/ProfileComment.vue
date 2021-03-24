<template>
  <div class="profile-comment">
    <client-only>
      <div class="rating">
        <star-rating
          :rating="data.rating"
          :increment="0.5"
          :show-rating="false"
          :read-only="true"
          :star-size="23"
          :glow="1"
        ></star-rating>
        <span>{{ data.rating }}/5</span>
      </div>
    </client-only>
    <h5 class="title">{{ data.title }}</h5>
    <p class="content">{{ data.content }}</p>
    <div class="author">{{ data.author }}</div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          rating: 0,
          title: "",
          content: "",
          author: ""
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.profile-comment {
    margin-bottom: 20px;
  &:not(:last-of-type) {
    border-bottom: 1px solid #dddddd;
  }
  .rating {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
    span {
      margin-top: 7px;
      @include h.appDirAuto($margin-start: 10px);
    }
  }
  .content {
    margin-bottom: 35px;
  }
  .author {
    color: h.$primary;
    margin-bottom: 10px;
  }
}
</style>
