require("dotenv").config();
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");


const auth = {
    auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN
    }
}



const transporter = nodemailer.createTransport(mailGun(auth));  

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: email,
        to: "elisha_ngoma@yahoo.fr",
        subject,
        text
    };
    
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
};

module.exports = sendMail;



