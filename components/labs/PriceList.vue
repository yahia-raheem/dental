<template>
  <div class="list-container">
    <client-only>
      <vsa-list :force-active="forceActive">
        <vsa-item>
          <vsa-heading>
            <div class="title">
              <p class="text">{{ title }}</p>
            </div>
          </vsa-heading>
          <vsa-content>
            <ul>
              <li>
                <span class="title">IPS e.max Monolithic</span>
                <span class="price">800 L.E</span>
              </li>
              <li>
                <span class="title">IPS e.max Cutback</span>
                <span class="price">900 L.E</span>
              </li>
              <li>
                <span class="title">IPS e.max Layered</span>
                <span class="price">1100 L.E</span>
              </li>
            </ul>
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </client-only>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    forceActive: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.list-container::v-deep {
  margin: 10px 0;
  .title {
    .text {
      margin: 0;
      @include h.appDirAuto($text-align: start);
      font-weight: normal;
      color: #4e4e4e;
      font-size: 0.9rem;
    }
  }
  .vsa-list {
    --vsa-max-width: 100%;
    --vsa-heading-padding: 0 10px;
    --vsa-text-color: #838383;
    --vsa-highlight-color: none;
    --vsa-bg-color: none;
    --vsa-border: none;
    --vsa-content-padding: 0.5rem;
    --vsa-default-icon-size: 0.35;

    .vsa-item__trigger {
      position: relative;
      border-radius: 5px;
      background-color: #f0f5fa;
      .vsa-item__trigger__icon--is-default {
        &::before,
        &::after {
          background-color: #6e6e6e;
          height: 5px;
        }
      }
      &:hover,
      &:focus,
      &:active {
        color: black;
        .vsa-item__trigger__icon--is-default {
          &::before,
          &::after {
            background-color: #6a6eb3;
          }
        }
      }
    }
    .vsa-item__content {
        padding-bottom: 0;
      ul {
        list-style: none;
        @include h.appDirAuto($padding-start: 0);
        padding-top: 5px;
        margin-bottom: 0;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 5px;
          margin-bottom: 5px;
          color: #585858;
          &:not(:last-of-type) {
            border-bottom: 1px solid #dedede;
          }
        }
      }
    }
  }
}
</style>
