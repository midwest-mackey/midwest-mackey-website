import { Router } from 'express';
import nodemailer from 'nodemailer';
import { getDb } from '../db/database.js';

const router = Router();
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 3000;

router.post('/inquiries', async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    return res.status(400).json({ error: 'Please provide your name, email, and lawn details.' });
  }

  const inquiry = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim()
  };

  if (
    !inquiry.name || inquiry.name.length > MAX_NAME ||
    !inquiry.email || inquiry.email.length > MAX_EMAIL ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email) ||
    !inquiry.message || inquiry.message.length > MAX_MESSAGE
  ) {
    return res.status(400).json({ error: 'Please check your details and try again.' });
  }

  try {
    await getDb().run(
      `INSERT INTO mowing_inquiries (name, email, message, createdAt)
       VALUES (?, ?, ?, ?)`,
      inquiry.name,
      inquiry.email,
      inquiry.message,
      new Date().toISOString()
    );
  } catch (error) {
    console.error('Failed to save mowing inquiry:', error);
    return res.status(500).json({ error: 'We could not save your request. Please try again.' });
  }

  // The saved inquiry remains available if email delivery is temporarily unavailable.
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        connectionTimeout: 10000,
        socketTimeout: 10000
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.MOWING_INQUIRIES_TO || process.env.EMAIL_USER,
        replyTo: inquiry.email,
        subject: `Mackey's Mowing inquiry from ${inquiry.name.replace(/[\r\n]/g, ' ')}`,
        text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\n\nProperty and service details:\n${inquiry.message}`
      });
    } catch (error) {
      console.error('Mowing inquiry saved, but email notification failed:', error);
    }
  } else {
    console.warn('Mowing inquiry saved without email notification: EMAIL_USER or EMAIL_PASS is missing.');
  }

  return res.status(201).json({ success: true });
});

export default router;
