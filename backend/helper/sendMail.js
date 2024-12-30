const nodemailer = require("nodemailer");

const mailSender = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(mailSender);

exports.sendMail = async ({ receiverEmail, subject, text, html }) => {
  if (!receiverEmail || !subject) return;

  const mailOptions = {
    from: mailSender.auth.user,
    to: receiverEmail,
    subject,
    text: text || "",
    html: html || "",
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending email: ", err);
  }
};
