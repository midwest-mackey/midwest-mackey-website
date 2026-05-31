import { notifyAdmins } from "./push.service.js";

export async function emitEvent(type, payload) {

  switch(type) {

    case "order_created":
      await notifyAdmins(type, {
        title: "🥚 New Order",
        body: `${payload.name} placed ${payload.dozenCount} dozen eggs`,
        orderId: payload.orderId
      });
      break;

    case "order_cancelled":
      await notifyAdmins(type, {
        title: "❌ Order Cancelled",
        body: `${payload.name} cancelled an order`,
        orderId: payload.orderId
      });
      break;
  }
}