import nodemailer from "nodemailer";

// Same Gmail app-password transporter app/api/contact/route.js already uses.
export function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}
