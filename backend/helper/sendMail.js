const nodemailer = require("nodemailer");

const mailSender = require("../config");

const transporter = nodemailer.createTransport(mailSender);
exports.sendMail = async (data) => {
  const { receiverEmail, subject, text, html } = data || {};
  if (!receiverEmail || !subject) return;
  return await transporter.sendMail({
    from: mailSender.auth.user,
    to: receiverEmail,
    subject: subject,
    text: text || "",
    html: html,
  });
};
