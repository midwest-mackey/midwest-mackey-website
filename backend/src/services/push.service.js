import webpush from "web-push";
import { getDb } from "../db/database.js";

export async function notifyAdmins(type, payload) {
  const db = getDb();

  const subscriptions = await db.all(`
    SELECT *
    FROM push_subscriptions
    WHERE enabled = 1
  `);

  if (!subscriptions.length) return;

  const pushPayload = JSON.stringify({
    type,
    ...payload
  });

  await Promise.allSettled(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth
            }
          },
          pushPayload
        );

        await db.run(
          `
          UPDATE push_subscriptions
          SET failureCount = 0,
              lastFailureAt = NULL
          WHERE id = ?
          `,
          [sub.id]
        );

      } catch (err) {

        console.error("❌ Push failed:", {
          statusCode: err.statusCode,
          endpoint: sub.endpoint,
          message: err.message
        });

        await db.run(
          `
          UPDATE push_subscriptions
          SET failureCount = failureCount + 1,
              lastFailureAt = ?
          WHERE id = ?
          `,
          [new Date().toISOString(), sub.id]
        );

        if (err.statusCode === 404 || err.statusCode === 410) {
          await db.run(
            `
            DELETE FROM push_subscriptions
            WHERE id = ?
            `,
            [sub.id]
          );
        }
      }
    })
  );
}