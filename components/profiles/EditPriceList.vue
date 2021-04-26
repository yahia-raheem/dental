<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="ttile">Price List</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div
          class="form-row group"
          v-for="(group, groupKey) in groups"
          :key="groupKey"
        >
          <div class="row-label">Group {{ groupKey + 1 }}</div>
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
              <div class="col-2 d-none d-lg-block">
                <p class="list-label mb-3">price</p>
              </div>
            </div>
            <div
              class="form-row"
              v-for="(item, itemKey) in group.items"
              :key="itemKey"
            >
              <div class="form-group col-lg-6 col-md-12">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="item.title"
                  placeholder="Title"
                />
              </div>
              <div class="form-group col-lg-2 col-md-10 col-8">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="item.price"
                  placeholder="Price"
                />
              </div>
              <div
                class="form-group col-4 col-md-2 d-flex justify-content-start align-items-center"
              >
                <button
                  class="btn add-item"
                  v-if="itemKey == group.items.length - 1"
                  @click.prevent="addItem(groupKey)"
                  :key="itemKey"
                >
                  <get-svg :svgid="111" width="11" height="11" />
                </button>
                <button
                  class="btn remove-item"
                  v-if="group.items.length > 1"
                  @click.prevent="removeItem(groupKey, itemKey)"
                  :key="itemKey + 1"
                >
                  <get-svg :svgid="112" width="12" height="12" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="form-row d-flex justify-content-center justify-content-sm-end align-items-center mb-4"
        >
          <button
            class="remove-group btn"
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
                price: ""
              }
            ]
          }
        ];
      }
    }
  },
  methods: {
    addGroup() {
      this.groups.push({
        listName: "",
        items: [
          {
            title: "",
            price: ""
          }
        ]
      });
    },
    addItem(groupKey) {
      this.groups[groupKey].items.push({
        title: "",
        price: ""
      });
    },
    removeItem(groupKey, itemKey) {
      this.groups[groupKey].items.splice(itemKey, 1);
    },
    removeGroup() {
      this.groups.pop();
    },
    submit() {
      console.log("fired");
    }
  }
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
  color: #d8072d;
}
.add-item::v-deep {
  background-color: h.$primary;
  @include h.appDirAuto($margin-end: 5px);
  svg path {
    fill: white;
  }
}
.remove-item::v-deep {
  background-color: #d8072d;
  svg {
    polygon {
      fill: white;
    }
    path {
      fill: white;
    }
  }
}
.add-item,
.remove-item {
  width: 25px;
  height: 25px;
  padding: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
}
</style>
