import { getDb } from "./database.js";

// ===============================
// CREATE ORDER
// ===============================
export async function createOrder(order) {
  const db = getDb();

  return db.run(
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
      status,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      order.status,
      order.createdAt
    ]
  );
}

// ===============================
// GET ORDERS BY DEVICE
// ===============================
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

// ===============================
// GET ALL ORDERS (ADMIN)
// ===============================
export async function getAllOrders() {
  const db = getDb();

  return db.all(
    `SELECT * FROM egg_orders ORDER BY id DESC`
  );
}

// ===============================
// GET ORDER BY ID
// ===============================
export async function getOrderById(id) {
  const db = getDb();

  return db.get(
    `SELECT * FROM egg_orders WHERE id = ?`,
    [id]
  );
}

// ===============================
// UPDATE ORDER
// ===============================
export async function updateOrder(id, fields) {
  const db = getDb();

  return db.run(
    `
    UPDATE egg_orders
    SET status = ?,
        dozenCount = ?,
        totalPrice = ?
    WHERE id = ?
    `,
    [
      fields.status,
      fields.dozenCount,
      fields.totalPrice,
      id
    ]
  );
}

// ===============================
// MARK NOTIFIED
// ===============================
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