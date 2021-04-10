// File managing sownloading of images and thumbnail creations

const fs = require("fs");
const request = require("request");
const sharp = require("sharp");

const image_dir = "uploads/images/";
if (!fs.existsSync(image_dir)) {
    fs.mkdirSync(image_dir, { recursive: true }, (err) => {
        console.log(err);
    });
}

const thumb_dir = "uploads/thumbs/";
if (!fs.existsSync(thumb_dir)) {
    fs.mkdirSync(thumb_dir, { recursive: true }, (err) => {
        console.log(err);
    });
}

// Function to download file from url provided in CSV file and save to database
module.exports.downloadFile = async (id, img_obj) => {
    let image_dest = image_dir + id + "-" + img_obj.ID + ".jpeg";
    let thumb_dest = thumb_dir + id + "-" + img_obj.ID + ".jpeg";
    let url = img_obj["Image URL"];

    await request.head(url, function (err, res, body) {
        request(url)
            .pipe(fs.createWriteStream(image_dest))
            .on("close", () => {
                sharp(image_dest)
                    .resize(256, 256)
                    .toFile(thumb_dest, (err, resizeImage) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(
                                "Image " +
                                    id +
                                    " Downloaded and Thumbnail created"
                            );
                        }
                    });
            });
    });

    return { image_dest, thumb_dest };
};
