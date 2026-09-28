import { Router } from 'express';
import nodemailer from 'nodemailer';
import { getDb } from '../db/database.js';

const router = Router();
const MAX_NAME = 100;
const MAX_PHONE = 30;
const MAX_EMAIL = 254;
const MAX_ADDRESS = 250;
const MAX_MESSAGE = 3000;

router.post('/inquiries', async (req, res) => {
  const { name, phone, email, address, message } = req.body ?? {};
  const isLegacyInquiry = typeof message === 'string' && phone === undefined && address === undefined;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    (!isLegacyInquiry && (typeof phone !== 'string' || typeof address !== 'string'))
  ) {
    return res.status(400).json({ error: 'Please provide your name, phone, email, and address.' });
  }

  const inquiry = {
    name: name.trim(),
    phone: isLegacyInquiry ? null : phone.trim(),
    email: email.trim(),
    address: isLegacyInquiry ? null : address.trim(),
    message: isLegacyInquiry ? message.trim() : ''
  };

  if (
    !inquiry.name || inquiry.name.length > MAX_NAME ||
    !inquiry.email || inquiry.email.length > MAX_EMAIL ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email) ||
    (isLegacyInquiry
      ? !inquiry.message || inquiry.message.length > MAX_MESSAGE
      : !inquiry.phone || inquiry.phone.length > MAX_PHONE ||
        !/^[+()\d.\s-]+$/.test(inquiry.phone) ||
        inquiry.phone.replace(/\D/g, '').length < 7 ||
        inquiry.phone.replace(/\D/g, '').length > 15 ||
        !inquiry.address || inquiry.address.length > MAX_ADDRESS)
  ) {
    return res.status(400).json({ error: 'Please check your details and try again.' });
  }

  try {
    await getDb().run(
      `INSERT INTO mowing_inquiries (name, phone, email, address, message, createdAt)
       VALUES (?, ?, ?, ?, ?, ?)`,
      inquiry.name,
      inquiry.phone,
      inquiry.email,
      inquiry.address,
      inquiry.message,
      new Date().toISOString()
    );
  } catch (error) {
    console.error('Failed to save mowing inquiry:', error);
    return res.status(500).json({ error: 'We could not save your request. Please try again.' });
  }

  // The saved inquiry remains available if notifications are temporarily unavailable.
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      connectionTimeout: 10000,
      socketTimeout: 10000
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'midwestmackey@gmail.com',
        replyTo: inquiry.email,
        subject: `Mackey's Mowing inquiry from ${inquiry.name.replace(/[\r\n]/g, ' ')}`,
        text: isLegacyInquiry
          ? `Name: ${inquiry.name}\nEmail: ${inquiry.email}\n\nProperty and service details:\n${inquiry.message}`
          : `Name: ${inquiry.name}\nPhone: ${inquiry.phone}\nEmail: ${inquiry.email}\nProperty address: ${inquiry.address}`
      });
    } catch (error) {
      console.error('Mowing inquiry saved, but email notification failed:', error);
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: '5152031974@vtext.com',
        subject: '',
        text: `Mowing request from ${inquiry.name.slice(0, 40)}${inquiry.phone ? ` (${inquiry.phone})` : ''}. Details sent to midwestmackey@gmail.com.`
      });
    } catch (error) {
      console.error('Mowing inquiry saved, but Verizon text notification failed:', error);
    }
  } else {
    console.warn('Mowing inquiry saved without email or text notification: EMAIL_USER or EMAIL_PASS is missing.');
  }

  return res.status(201).json({ success: true });
});

export default router;
