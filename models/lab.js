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
      res.id,
      res.title,
      res.rating,
      res.location,
      res.specialities,
      res.image
    );
  }
}
