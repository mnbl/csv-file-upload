const FileModel = require("../Model/File");
const csv = require("csv-parser");
var send_mail = require("../Helpers/SendMail");
var manageImages = require("../Helpers/ManageImages");
const fs = require("fs");

// Creating new entry for user
module.exports.newEntry = async (req, res, next) => {
    // Add '.csv' extention to file name
    fs.rename(req.file.path, req.file.path + ".csv", (err) => {
        if (err) throw new Error("Error in renaming file");
    });

    // Add '.csv' extention to file name
    let file = req.file.path + ".csv";
    req.flash(
        "message",
        "Images are being uploaded, you'll get an email when it's done"
    );

    // Save User email and csv file path in database
    let data = await FileModel.createNew(req.body.email, file);

    var images = [];
    var thumbs = [];

    // Read csv file contents
    fs.createReadStream(file)
        .pipe(csv())
        .on("data", async (img_obj) => {
            var img_data = await manageImages.downloadFile(data.id, img_obj);
            images.push(img_data.image_dest);
            thumbs.push(img_data.thumb_dest);
        })
        .on("end", async () => {
            await FileModel.updateImage(data.id, images, thumbs);
        });

    send_mail.sendMail(req.body.email);

    return res.redirect("/");
};
