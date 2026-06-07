// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.log("Mailer Error:", error);
// //   } else {
// //     console.log("Brevo SMTP Connected");
// //   }
// // });

// // module.exports = transporter;

// module.exports = {};

const nodemailer = require("nodemailer");
require("dotenv").config();

// Create the transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // STARTTLS is used on port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// DEBUGGING: Uncomment this during development to check if 
// your email credentials are working
/*
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mailer Error:", error);
  } else {
    console.log("✅ Brevo SMTP Connected successfully");
  }
});
*/

// FIXED: Now exporting the actual transporter object
module.exports = transporter;
