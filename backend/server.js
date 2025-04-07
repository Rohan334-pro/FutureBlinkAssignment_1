require("dotenv").config();
const express = require("express");
const Agenda = require("agenda");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const Flow = require("./models/Flow");
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);


const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

agenda.define("sendEmail", async (job) => {
  const { email, subject, body } = job.attrs.data;
  console.log("📧 Sending email to:", email, "at", new Date());
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: body,
  }, (error, info) => {
    if (error) {
      console.error("❌ Error sending email:", error);
    } else {
      console.log("✅ Email sent:", info.response);
    }
  });
  
});

(async function () {
  await agenda.start();
})();
app.post("/api/save-flow", async (req, res) => {
  try {
    const { nodes } = req.body;

    // Save the flow
    const flow = new Flow({ nodes });
    await flow.save();

    // Schedule emails
    let cumulativeDelay = 0;
    for (const node of nodes) {
      cumulativeDelay += node.delayAfterPreviousNode || 0;

      if (node.type === "coldEmail") {
        const scheduleTime = new Date(Date.now() + cumulativeDelay * 60000);

        await agenda.schedule(scheduleTime, "sendEmail", {
          email: node.email,
          subject: node.subject,
          body: node.body,
        });
      }
    }

    res.status(200).json({ message: "Flow saved and emails scheduled." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});



