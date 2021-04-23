<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="ttile">Price List</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row group" v-for="(group, key) in groups" :key="key">
          <div class="row-label">Group {{ key + 1 }}</div>
          <div class="form-group col-lg-6 col-md-12">
            <label class="list-label">List Name</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="group.listName"
              placeholder="List Name"
            />
          </div>
          <div class="col-lg-12 col-md-12">
            <div class="form-row">
              <div class="col-6">
                <p class="list-label mb-3">sub List</p>
              </div>
              <div class="col-2">
                <p class="list-label mb-3">price</p>
              </div>
            </div>
            <div class="form-row" v-for="(item, key) in group.items" :key="key">
              <div class="form-group col-6">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="item.title"
                  placeholder="Title"
                />
              </div>
              <div class="form-group col-2">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="item.price"
                  placeholder="Price"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="form-row d-flex justify-content-end align-items-center mb-4"
        >
          <button
            class="remove-group btn btn-danger"
            @click.prevent="removeGroup"
            v-if="groups.length > 1"
          >
            Remove Group
          </button>
          <button class="add-group btn" @click.prevent="addGroup">
            Add Group
          </button>
        </div>
        <div class="form-row">
          <div class="cta-container">
            <button
              type="submit"
              class="btn btn-primary submit-btn d-flex justify-content-center align-items-center"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
      default() {
        return [
          {
            listName: "",
            items: [
              {
                title: "",
                price: "",
              },
            ],
          },
        ];
      },
    },
  },
  methods: {
    addGroup() {
      this.groups.push({
        listName: "",
        items: [
          {
            title: "",
            price: "",
          },
        ],
      });
    },
    removeGroup() {
      this.groups.pop();
    },
    submit() {
      console.log("fired");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.form-row.group {
  position: relative;
  border: 1px solid #f0f0f0;
  padding-top: 25px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  .row-label {
    position: absolute;
    background-color: white;
    z-index: 5;
    top: 0;
    transform: translateY(-50%);
    @include h.appDirAuto($start: 15px);
    font-size: 0.9rem;
    padding: 0 15px;
    font-weight: bold;
  }
  .list-label {
    font-size: 0.9rem;
    font-weight: bold;
  }
}
.add-group {
  background-color: #565656;
  color: white;
}
.remove-group {
  @include h.appDirAuto($margin-end: 15px);
}
</style>