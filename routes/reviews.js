const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isAuthor } = require("../middleware.js");
const reviewController = require("../controller/reviews.js");

router.post("/", isLoggedIn, wrapAsync(reviewController.createReview));

router.delete(
  "/:reviewId",
  isAuthor,
  isLoggedIn,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
