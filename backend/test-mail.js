require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: "rohan.kumbhar334@gmail.com", // replace with your test email
  subject: "Manual Test Email",
  text: "This is a test email from Nodemailer!",
}, (err, info) => {
  if (err) {
    console.error("❌ Email failed:", err);
  } else {
    console.log("✅ Email sent:", info.response);
  }
});
