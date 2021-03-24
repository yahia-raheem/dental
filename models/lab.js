import CommonMethods from "./commonMethods";

export default class Lab extends CommonMethods {
  constructor(id, title, rating, location, specialities, image = null) {
    super();
    this.id = id;
    this.title = title;
    this.rating = rating;
    this.location = location;
    this.specialities = specialities;
    this.image = image;
  }
  static fromMap(res) {
    return new Lab(
      (id = res.id),
      (title = res.title),
      (rating = res.rating),
      (location = res.location),
      (specialities = res.specialities),
      (image = res.image)
    );
  }
}
