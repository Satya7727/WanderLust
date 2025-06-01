const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage })

router
.route("/")
//Index 
.get(wrapAsync(listingController.index))
//create route
.post(isLoggedIn,upload.single('listing[image]'), wrapAsync(listingController.createListing));

//finding category
router("/index")
  .get(wrapAsync(listingController.indexCategory))

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
//Show route
.get(wrapAsync(listingController.showListing))
//Update route
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
//Delete route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;