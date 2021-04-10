var express = require("express");
var router = express.Router();
var User = require("../app/Controller/User");
var Multer = require("../app/Helpers/Multer");

/* GET home page. will redirect to upload form */
router.get("/", function (req, res, next) {
    res.redirect("/upload");
});

router.get("/upload", function (req, res, next) {
    res.render("upload", {
        title: "Upload Files",
        message: req.flash("message"),
    });
});

router.post("/uploads", Multer.upload.single("csv_file"), User.newEntry);

module.exports = router;
