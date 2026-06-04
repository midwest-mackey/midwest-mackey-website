import { notifyAdmins } from "./push.service.js";
import { sendSmsNotification } from "./sms.service.js";
import { getDb } from "../db/database.js";

export async function emitEvent(type, payload) {
  const db = getDb();

  const admins = await db.all(`
    SELECT id, smsEnabled, smsPhoneNumber
    FROM users
    WHERE role = 'admin'
  `);

  const pushPayload = {
    order_created: {
      title: "🥚 New Order",
      body: `${payload.name} placed ${payload.dozenCount} dozen eggs ready for ${payload.pickupDate}.`,
      orderId: payload.orderId
    },

    order_cancelled: {
      title: "❌ Order Cancelled",
      body: `${payload.name} cancelled an order`,
      orderId: payload.orderId
    }
  }[type];

  if (!pushPayload) {
    console.warn(`⚠️ Unknown event type: ${type}`);
    return;
  }

  // PUSH (all admins/devices)
  await notifyAdmins(type, pushPayload).catch(err => {
    console.error("❌ Push notification failed:", err);
  });

  // SMS (per admin)
  const smsAdmins = admins.filter(
    a => a.smsEnabled && a.smsPhoneNumber
  );

  await Promise.allSettled(
    smsAdmins.map(admin =>
      sendSmsNotification(
        admin.smsPhoneNumber,
        type === "order_created"
          ? `🥚 New order from ${payload.name} (${payload.dozenCount} dozen eggs)
          https://eggs.midwestmackey.com/admin`
          : `❌ ${payload.name} cancelled an order
          https://eggs.midwestmackey.com/admin`
      )
    )
  );
}