const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(req.params.id);
  let newRe = new Review(req.body.review);
  newRe.author = req.user._id;
  listing.reviews.push(newRe);
  await newRe.save();
  await listing.save();
  req.flash("success", "new review created");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "review deleted");
  res.redirect(`/listings/${id}`);
};
