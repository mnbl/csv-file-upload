"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * FileSchema
 *
 * email - Email of User
 * csv_file - CSV file containing list of images urls
 * images - Images downloaded througn link in csv file
 * images - Thumbnails of downloaded images
 */
let FileSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        csv_file: {
            type: String,
        },
        images: [
            {
                type: String,
            },
        ],
        thumbs: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("File", FileSchema);
