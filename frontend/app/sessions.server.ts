import { createCookieSessionStorage, redirect } from "@remix-run/node";

export const remixSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "S3RQr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getRemixSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return remixSessionStorage.getSession(cookie);
}
