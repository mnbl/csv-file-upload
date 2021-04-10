const Model = require("../Schema/File");

module.exports.createNew = async (email, csv) => {
    var item = new Model({
        email: email,
        csv_file: csv,
    });

    return await item.save();
};

module.exports.updateImage = async (id, images, thumbs) => {
    var data = {
        images: images,
        thumbs: thumbs,
    };

    return await Model.updateOne({ _id: id }, { $set: data });
};
