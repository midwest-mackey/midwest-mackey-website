// src/services/sms.service.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function toVerizonGateway(phoneNumber) {
  if (!phoneNumber) return null;

  const cleaned = phoneNumber.replace(/\D/g, "");
  return `${cleaned}@vtext.com`;
}

export async function sendSmsNotification(phoneNumber, message) {
  try {
    const to = toVerizonGateway(phoneNumber);

    if (!to) {
      console.warn("⚠️ SMS skipped: missing phone number");
      return;
    }

    if (!message) {
      console.warn("⚠️ SMS skipped: empty message");
      return;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "",
      text: message
    });

    console.log(`📩 Verizon SMS sent → ${phoneNumber}`);
  } catch (err) {
    console.error("❌ Verizon SMS failed:", err.message || err);
  }
}