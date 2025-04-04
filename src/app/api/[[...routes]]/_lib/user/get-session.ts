import { Context } from "elysia";
import { auth } from "@/lib/auth";

export async function getSession(c: Context) {
  const session = await auth.api.getSession({
    headers: c.request.headers,
  });
  return session;
}
