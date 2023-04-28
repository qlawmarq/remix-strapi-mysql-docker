import { RemixI18Next } from "remix-i18next";
import Backend from "i18next-fs-backend";
import { join, resolve } from "path";
import { getRemixSession, remixSessionStorage } from "~/sessions.server";
import { redirect } from "@remix-run/node";

export const i18nConfig = {
  // This is the list of languages your application supports
  supportedLngs: ["en", "ja"],
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: "en",
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: "common",
  // Disabling suspense is recommended
  react: { useSuspense: false },
  returnObjects: true,
};

export const localePath = "/locales/{{lng}}/{{ns}}.json";

export const remixI18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18nConfig.supportedLngs,
    fallbackLanguage: i18nConfig.fallbackLng,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18nConfig,
    backend: {
      loadPath: resolve(join("./public/", localePath)),
    },
  },
  // The backend you want to use to load the translations
  // Tip: You could pass `resources` to the `i18next` configuration and avoid
  // a backend here
  backend: Backend,
});

/**
 * Check pathname is supported locale
 * @param pathname URLObject.pathname
 * @returns {boolean}
 */

export const isSupportedLocale = (pathname: string): boolean => {
  if (pathname == "/" || pathname.length <= 1 || !pathname.includes("/")) {
    return false;
  }
  const maybeLocale = pathname.split("/")[1];
  if (i18nConfig.supportedLngs.includes(maybeLocale)) {
    return true;
  } else {
    return false;
  }
};

/**
 * User locale session
 */

const USER_LOCALE_KEY = "userLocale";

export async function getUserLocale(request: Request): Promise<string> {
  const session = await getRemixSession(request);
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
  const session = await getRemixSession(request);
  session.set(USER_LOCALE_KEY, locale);
  return redirect(locale, {
    headers: {
      "Set-Cookie": await remixSessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 30, // 30 days,
      }),
    },
  });
}
