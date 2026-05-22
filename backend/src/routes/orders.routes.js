import express from 'express';
import { getDb } from '../db/database.js';
import { getConfig } from '../services/config.service.js';

const router = express.Router();

// CURRENT PRICE
router.get('/pricing', (req, res) => {
  const config = getConfig();

  res.json({
    unitEggPrice: config?.pricing?.unitEggPrice ?? 5
  });
});

// CREATE ORDER
router.post('/all', async (req, res) => {
  const {
    name,
    phoneNumber,
    paymentType,
    pickupDate,
    dozenCount,
    deviceId
  } = req.body;

  if (!name || !phoneNumber || !paymentType || !dozenCount || !deviceId) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const status = 'pending'; // default status for new orders
  const db = getDb();
  const config = getConfig();

  const unitEggPrice = config?.pricing?.unitEggPrice ?? 5;
  const expectedTotal = dozenCount * unitEggPrice;

  // OPTIONAL: client price validation (safe logging only)
  if (req.body.totalPrice && req.body.totalPrice !== expectedTotal) {
    console.warn('⚠️ Price mismatch detected from client');
  }

  console.log(
    `🥚 Order received: ${name} | ${dozenCount} dozen | ${pickupDate} | ${paymentType} | ${new Date().toISOString()}`
  );

  await db.run(
    `INSERT INTO egg_orders
    (name, phoneNumber, paymentType, pickupDate, dozenCount, deviceId, unitPrice, totalPrice, status,createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      phoneNumber,
      paymentType,
      pickupDate,
      dozenCount,
      deviceId,
      unitEggPrice,
      expectedTotal,
      status,
      new Date().toISOString()
    ]
  );

  res.json({ success: true, totalPrice: expectedTotal });
});

// ALL ORDERS (admin/debug)
router.get('/all', async (req, res) => {
  const db = getDb();

  const orders = await db.all(
    `SELECT * FROM egg_orders ORDER BY id DESC`
  );

  res.json(orders);
});

// DEVICE HISTORY
router.get('/history', async (req, res) => {
  const db = getDb();
  const { deviceId } = req.query;

  if (!deviceId) {
    return res.status(400).json({ error: 'Missing deviceId' });
  }

  const orders = await db.all(
    `SELECT * FROM egg_orders
     WHERE deviceId = ?
     ORDER BY id DESC`,
    [deviceId]
  );

  res.json(orders);
});

// UPDATE ORDER STATUS (admin)
router.patch('/all/:id/status', async (req, res) => {
  const db = getDb();

  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    'requested',
    'ready',
    'completed',
    'cancelled'
  ];

  if (!allowedStatuses.includes(status)) {
    return res
      .status(400)
      .json({ error: 'Invalid status' });
  }

  await db.run(
    `
      UPDATE egg_orders
      SET status = ?
      WHERE id = ?
    `,
    [status, id]
  );

  res.json({ success: true });
});

export default router;