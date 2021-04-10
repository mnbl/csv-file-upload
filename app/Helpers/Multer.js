// A file to manage file uploads

const multer = require("multer");
const fs = require("fs");

// Checks for file upload directory. If doesn't exists it creates one.
const csv_dir = "uploads/";
if (!fs.existsSync(csv_dir)) {
    fs.mkdirSync(csv_dir, { recursive: true }, (err) => {
        console.log(err);
    });
}

// Link multer with file upload directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, csv_dir);
    },
});

// Create filter to accept only csv file
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "text/csv") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Create upload function that will accept csv file
module.exports.upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
