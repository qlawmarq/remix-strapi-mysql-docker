import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { remixI18next } from "~/lib/i18n";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "S3RQr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});

async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

/**
 * User locale session
 */

const USER_LOCALE_KEY = "userLocale";

export async function getUserLocale(request: Request): Promise<string> {
  const session = await getSession(request);
  let locale: string | undefined | null = session.get(USER_LOCALE_KEY);
  // If session does not exist, then return i18n default locale.
  if (!locale) {
    locale = await remixI18next.getLocale(request);
  }
  return locale;
}

export async function updateUserLocaleSession({
  request,
  locale,
}: {
  request: Request;
  locale: string;
}) {
  const session = await getSession(request);
  session.set(USER_LOCALE_KEY, locale);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 30, // 30 days,
      }),
    },
  });
}
