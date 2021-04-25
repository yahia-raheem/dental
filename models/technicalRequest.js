import CommonMethods from "./commonMethods";

export default class TechnicalRequest extends CommonMethods {
  constructor(
    teeth = "",
    restoration = null,
    material = null,
    shade = "",
    design = null,
    implants = null,
    smileDesign = null,
    nextStep = "",
    comments = ""
  ) {
    super();
    this.teeth = teeth;
    this.restoration = restoration;
    this.material = material;
    this.shade = shade;
    this.design = design;
    this.implants = implants;
    this.smileDesign = smileDesign;
    this.nextStep = nextStep;
    this.comments = comments;
  }
  static fromwpRes(res) {
    return new TechnicalRequest(
      res.teeth,
      res.restoration,
      res.material,
      res.shade,
      res.design,
      res.implants,
      res.smileDesign,
      res.nextStep,
      res.comments
    );
  }
}
