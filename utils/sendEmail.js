const nodemailer = require('nodemailer');
const keys = require('../config/keys');

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: keys.EMAIL_SERVICE,
        auth: {
            user: keys.EMAIL_USERNAME,
            pass: keys.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    const mailOptions = {
        from: keys.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    transporter.sendMail(mailOptions, function(err, info){
        if(err) console.log(err);
        else console.log(info);

    });
};

module.exports = sendEmail;