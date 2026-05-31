import { getDb } from "./database.js";

// CREATE ORDER
export async function createOrder(order) {
  const db = getDb();

  const result = await db.run(
    `
    INSERT INTO egg_orders (
      name,
      phoneNumber,
      paymentType,
      pickupDate,
      dozenCount,
      eggCondition,
      orderNotes,
      deviceId,
      unitPrice,
      totalPrice,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      order.name,
      order.phoneNumber,
      order.paymentType,
      order.pickupDate,
      order.dozenCount,
      order.eggCondition,
      order.orderNotes,
      order.deviceId,
      order.unitPrice,
      order.totalPrice,
      order.status
    ]
  );

  return db.get(
    `SELECT * FROM egg_orders WHERE id = ?`,
    [result.lastID]
  );
}

// GET ORDERS BY DEVICE
export async function getOrdersByDevice(deviceId) {
  const db = getDb();

  return db.all(
    `
    SELECT * FROM egg_orders
    WHERE deviceId = ?
    ORDER BY id DESC
    `,
    [deviceId]
  );
}

// GET ALL ORDERS (ADMIN)
export async function getAllOrders() {
  const db = getDb();

  return db.all(
    `SELECT * FROM egg_orders ORDER BY id DESC`
  );
}

// GET ORDER BY ID
export async function getOrderById(id) {
  const db = getDb();

  return db.get(
    `SELECT * FROM egg_orders WHERE id = ?`,
    [id]
  );
}

// UPDATE ORDER
export async function patchOrder(id, fields) {
  const db = getDb();

  const allowed = [
    "status",
    "dozenCount",
    "totalPrice",
    "cancelledAt",
    "approvedAt",
    "completedAt"
  ];

  const safeFields = Object.keys(fields).reduce((acc, key) => {
    if (allowed.includes(key)) {
      acc[key] = fields[key];
    }
    return acc;
  }, {});

  const keys = Object.keys(safeFields);

  if (keys.length === 0) {
    return;
  }

  const values = Object.values(safeFields);
  const setClause = keys.map(k => `${k} = ?`).join(", ");

  return db.run(
    `
    UPDATE egg_orders
    SET ${setClause}
    WHERE id = ?
    `,
    [...values, id]
  );
}

// MARK NOTIFIED
export async function markNotified(id, column) {
  const db = getDb();

  return db.run(
    `
    UPDATE egg_orders
    SET ${column} = ?
    WHERE id = ?
    `,
    [new Date().toISOString(), id]
  );
}

// PUBLIC CANCEL ORDER
export async function cancelOrder(id) {
  const db = getDb();

  return db.run(
    `
    UPDATE egg_orders
    SET status = ?
    WHERE id = ?
    `,
    ["cancelled", id]
  );
}