import CommonMethods from "./commonMethods";

export default class TechnicalRequest extends CommonMethods {
  constructor(
    tooth_number = "",
    restoration = null,
    material = null,
    shade = "",
    design = null,
    implants = null,
    smile_design = null,
    next_step = "",
    comments = ""
  ) {
    super();
    this.tooth_number = tooth_number;
    this.restoration = restoration;
    this.material = material;
    this.shade = shade;
    this.design = design;
    this.implants = implants;
    this.smile_design = smile_design;
    this.next_step = next_step;
    this.comments = comments;
  }
  static fromwpRes(res) {
    return new TechnicalRequest(
      res.tooth_number,
      res.restoration,
      res.material,
      res.shade,
      res.design,
      res.implants,
      res.smile_design,
      res.next_step,
      res.comments
    );
  }
}
