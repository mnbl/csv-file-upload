//  File managing sending of emails

var nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// get username and password from https://ethereal.email/create
// Sent messages can be checked by loging in here: https://ethereal.email/login
var transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "collin.yost19@ethereal.email",
        pass: "a7raJpzfMk13AJs8eX",
    },
});

module.exports.sendMail = (email) => {
    //  Mesage content
    var mailOptions = {
        from: "carroll.davis@ethereal.email",
        to: email,
        subject: "File Downloaded",
        text:
            "Images from the csv-file were sucessfully downloaded and thumbnails are created",
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
