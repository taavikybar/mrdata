const nodemailer = require('nodemailer');
const log = require('./log')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  }
});

module.exports = {
  sendMail: (subject, text) => {
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        log(error)
      } else {
        log('Email sent: ' + info.response);
      }
    });
  }
}