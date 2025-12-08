// src/app/api/auth/clerk-webhook/route.js
import { Webhook } from "svix";
import { isAdminEmail } from "@/lib/clerk";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response("Webhook secret not set", { status: 500 });
  }

  const headers = Object.fromEntries(req.headers);
  const payload = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    return new Response("Invalid webhook signature", { status: 400 });
  }

  if (evt.type === "user.created" || evt.type === "user.updated") {
    const email = evt.data.email_addresses[0]?.email_address;
    const userId = evt.data.id;

    if (isAdminEmail(email)) {
      await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_metadata: { role: "admin" },
        }),
      });
    }
  }

  return new Response("OK", { status: 200 });
}