import express from 'express';
import { getDb } from '../db/database.js';
import fs from 'fs';

const router = express.Router();

const SETTINGS_PATH = '/app/config/settings.json';

//
// =====================================================
// 🧠 SETTINGS PERSISTENCE
// =====================================================
//

function loadSettings() {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      const raw = fs.readFileSync(
        SETTINGS_PATH,
        'utf-8'
      );

      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(
      '❌ Failed to load settings.json',
      err
    );
  }

  return {
    eggsAvailable: true,
    unitEggPrice: 5
  };
}

function saveSettings(settings) {
  try {
    fs.writeFileSync(
      SETTINGS_PATH,
      JSON.stringify(settings, null, 2),
      'utf-8'
    );

    console.log('✅ Settings saved');
  } catch (err) {
    console.error(
      '❌ Failed to save settings.json',
      err
    );
  }
}

//
// =====================================================
// 📩 NOTIFICATION HELPERS
// =====================================================
//

function getNotificationColumn(status) {
  return `${status}NotifiedAt`;
}

//
// =====================================================
// 💰 SETTINGS API
// =====================================================
//

router.get('/settings', (req, res) => {
  res.json(loadSettings());
});

router.patch('/settings', (req, res) => {
  const current = loadSettings();

  const updated = {
    ...current,
    eggsAvailable:
      typeof req.body.eggsAvailable === 'boolean'
        ? req.body.eggsAvailable
        : current.eggsAvailable,

    unitEggPrice:
      req.body.unitEggPrice !== undefined && !isNaN(Number(req.body.unitEggPrice))
        ? Number(req.body.unitEggPrice)
        : current.unitEggPrice
  };

  saveSettings(updated);

  res.json({
    success: true,
    settings: updated
  });
});

//
// =====================================================
// 🥚 CREATE ORDER
// =====================================================
//

router.post('/all', async (req, res) => {
  const {
    name,
    phoneNumber,
    paymentType,
    pickupDate,
    dozenCount,
    deviceId
  } = req.body;

  if (
    !name ||
    !phoneNumber ||
    !paymentType ||
    !pickupDate ||
    !dozenCount ||
    !deviceId
  ) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const db = getDb();

  const unitEggPrice = loadSettings().unitEggPrice ?? 5;
  const expectedTotal = dozenCount * unitEggPrice;

  const status = 'requested';

  console.log(
    `🥚 Order received: ${name} | ${dozenCount} dozen | ${pickupDate} | ${paymentType}`
  );

  await db.run(
    `
    INSERT INTO egg_orders (
      name,
      phoneNumber,
      paymentType,
      pickupDate,
      dozenCount,
      deviceId,
      unitPrice,
      totalPrice,
      status,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
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

  res.json({
    success: true,
    totalPrice: expectedTotal
  });
});

//
// =====================================================
// 📦 GET ALL ORDERS (ADMIN)
// =====================================================
//

router.get('/all', async (req, res) => {
  const db = getDb();

  const orders = await db.all(
    `SELECT * FROM egg_orders ORDER BY id DESC`
  );

  res.json(orders);
});

//
// =====================================================
// 📱 DEVICE HISTORY
// =====================================================
//

router.get('/history', async (req, res) => {
  const db = getDb();
  const { deviceId } = req.query;

  if (!deviceId) {
    return res.status(400).json({ error: 'Missing deviceId' });
  }

  const orders = await db.all(
    `
    SELECT * FROM egg_orders
    WHERE deviceId = ?
    ORDER BY id DESC
    `,
    [deviceId]
  );

  res.json(orders);
});

//
// =====================================================
// 🔁 UPDATE ORDER (ADMIN)
// =====================================================
//

router.patch('/all/:id/update', async (req, res) => {
  const db = getDb();

  const { id } = req.params;
  const { status, dozenCount } = req.body;

  const allowedStatuses = [
    'requested',
    'approved',
    'modified',
    'ready',
    'completed',
    'cancelled'
  ];

  const existing = await db.get(
    `SELECT * FROM egg_orders WHERE id = ?`,
    [id]
  );

  if (!existing) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const newStatus =
    status !== undefined ? status : existing.status;

  const newDozenCount =
    dozenCount !== undefined ? dozenCount : existing.dozenCount;

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  if (newDozenCount < 1 || isNaN(newDozenCount)) {
    return res.status(400).json({ error: 'Invalid dozenCount' });
  }

  const totalPrice = existing.unitPrice * newDozenCount;

  await db.run(
    `
    UPDATE egg_orders
    SET status = ?,
        dozenCount = ?,
        totalPrice = ?
    WHERE id = ?
    `,
    [
      newStatus,
      newDozenCount,
      totalPrice,
      id
    ]
  );

  res.json({
    success: true,
    updated: {
      status: newStatus,
      dozenCount: newDozenCount,
      totalPrice
    }
  });
});

//
// =====================================================
// 📩 MARK NOTIFIED
// =====================================================
//

router.patch('/all/:id/notified', async (req, res) => {
  const db = getDb();

  const { id } = req.params;
  const { status } = req.body;

  const column = `${status}NotifiedAt`;

  await db.run(
    `
    UPDATE egg_orders
    SET ${column} = ?
    WHERE id = ?
    `,
    [new Date().toISOString(), id]
  );

  res.json({ success: true });
});

//
// =====================================================
// 🔁 REORDER
// =====================================================
//

router.post('/reorder/:id', async (req, res) => {
  const db = getDb();
  const { id } = req.params;

  const original = await db.get(
    `SELECT * FROM egg_orders WHERE id = ?`,
    [id]
  );

  if (!original) {
    return res.status(404).json({ error: 'Order not found' });
  }

  await db.run(
    `
    INSERT INTO egg_orders (
      name,
      phoneNumber,
      paymentType,
      pickupDate,
      dozenCount,
      deviceId,
      unitPrice,
      totalPrice,
      status,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      original.name,
      original.phoneNumber,
      original.paymentType,
      original.pickupDate,
      original.dozenCount,
      original.deviceId,
      original.unitPrice,
      original.totalPrice,
      'requested',
      new Date().toISOString()
    ]
  );

  res.json({ success: true });
});

export default router;