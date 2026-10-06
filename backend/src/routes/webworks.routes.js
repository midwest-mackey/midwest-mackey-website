import { Router } from 'express';
import nodemailer from 'nodemailer';
import { getDb } from '../db/database.js';

const router = Router();
const SERVICE_LABELS = {
  newWebsite: 'A new website',
  updates: 'Website updates',
  hosting: 'Hosting'
};

router.post('/inquiries', async (req, res) => {
  const { name, email, phone, services, message } = req.body ?? {};
  if ([name, email, phone, message].some(value => typeof value !== 'string')) {
    return res.status(400).json({ error: 'Please provide your name, email, phone, and project details.' });
  }

  if (
    !Array.isArray(services) || services.length < 1 || services.length > 3 ||
    services.some(service => typeof service !== 'string' || !Object.hasOwn(SERVICE_LABELS, service)) ||
    new Set(services).size !== services.length
  ) {
    return res.status(400).json({ error: 'Please choose at least one valid service.' });
  }

  const inquiry = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    services,
    message: message.trim()
  };
  const phoneDigits = inquiry.phone.replace(/\D/g, '').length;
  if (
    !inquiry.name || inquiry.name.length > 100 ||
    !inquiry.email || inquiry.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email) ||
    !inquiry.phone || inquiry.phone.length > 30 ||
    !/^[+()\d.\s-]+$/.test(inquiry.phone) || phoneDigits < 7 || phoneDigits > 15 ||
    !inquiry.message || inquiry.message.length > 5000
  ) {
    return res.status(400).json({ error: 'Please check your contact details and project description.' });
  }

  try {
    const db = getDb();
    // Initialize only this feature's table, on demand. Existing schemas and startup are untouched.
    await db.run(`CREATE TABLE IF NOT EXISTS webworks_inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      services TEXT NOT NULL,
      message TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )`);
    await db.run(
      `INSERT INTO webworks_inquiries (name, email, phone, services, message, createdAt)
       VALUES (?, ?, ?, ?, ?, ?)`,
      inquiry.name, inquiry.email, inquiry.phone, JSON.stringify(inquiry.services),
      inquiry.message, new Date().toISOString()
    );
  } catch (error) {
    console.error('Failed to save Webworks inquiry:', error);
    return res.status(500).json({ error: 'We could not save your request. Please try again.' });
  }

  // Match mowing: save first; notification failures must not lose an accepted inquiry.
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
        subject: `Midwest Mackey Webworks inquiry from ${inquiry.name.replace(/[\r\n]/g, ' ')}`,
        text: [
          `Name: ${inquiry.name}`, `Phone: ${inquiry.phone}`, `Email: ${inquiry.email}`,
          `Services: ${inquiry.services.map(service => SERVICE_LABELS[service]).join(', ')}`,
          '', 'Project details:', inquiry.message
        ].join('\n')
      });
    } catch (error) {
      console.error('Webworks inquiry saved, but email notification failed:', error);
    }
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: '5152031974@vtext.com',
        subject: '',
        text: `Webworks request from ${inquiry.name.slice(0, 40)} (${inquiry.phone}). Details sent to midwestmackey@gmail.com.`
      });
    } catch (error) {
      console.error('Webworks inquiry saved, but Verizon text notification failed:', error);
    }
  } else {
    console.warn('Webworks inquiry saved without email or text notification: EMAIL_USER or EMAIL_PASS is missing.');
  }

  return res.status(201).json({ success: true });
});

export default router;
