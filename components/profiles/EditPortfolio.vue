<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="title">Add new Album</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row">
          <div class="form-group col-lg-5 col-md-6">
            <label for="albumName" class="form-label">Album Name</label>
            <input
              type="text"
              class="form-control"
              id="albumName"
              v-model.trim="albumName"
              placeholder="Album Name"
            />
          </div>
          <div class="form-group col-lg-5 col-md-6">
            <label class="form-label">Album Cover</label>
            <div class="custom-file" ref="cover">
              <input
                type="file"
                class="custom-file-input"
                id="albumCover"
                @change="coverChange"
                accept="image/*"
              />
              <label class="custom-file-label" for="albumCover"
                >Choose Image</label
              >
            </div>
          </div>
          <div
            class="form-group col-lg-2 col-md-6 d-flex flex-column justify-content-end align-items-center"
          >
            <button type="submit" class="btn submit-btn">Add New</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      albumName: null,
      albumCover: null
    };
  },
  methods: {
    coverChange() {}
  }
};
</script>
<style lang="scss" scoped>
.submit-btn {
  background-color: #505050;
  color: white;
}
</style>
