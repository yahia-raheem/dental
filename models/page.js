import CommonMethods from "./commonMethods";

export default class Page extends CommonMethods {
  constructor({
    id = null,
    title = null,
    content = null,
    custom_fields = null,
    meta_box = null
  }) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
    this.custom_fields = custom_fields || meta_box;
  }
  static fromwpRes(res) {
    return new Page({
      id: res.id,
      title: res.title.rendered,
      content: res.content.rendered,
      custom_fields: res.meta_box
    })
  }
}
