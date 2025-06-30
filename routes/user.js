const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { savedUrl } = require("../middleware.js");
const userController = require("../controller/users.js");

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controller/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(userController.signup);

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
  );

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    savedUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );


router.get("/logout", userController.logout);

module.exports = router;
