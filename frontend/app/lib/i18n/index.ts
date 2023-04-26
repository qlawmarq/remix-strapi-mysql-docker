import { RemixI18Next } from "remix-i18next";
import Backend from "i18next-fs-backend";
import { resolve, join } from "path";

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
