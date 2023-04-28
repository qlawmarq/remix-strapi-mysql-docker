import { Form } from "@remix-run/react";
import { i18nConfig } from "~/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "~/components/Atoms/Container";
import { Select, Toggle } from "~/components/Atoms/Form";

export const Header = ({ locale }: { locale: string }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  const { i18n } = useTranslation();
  const el = useRef<HTMLFormElement>(null);
  const changeLanguageHandler = (locale: string) => {
    i18n.changeLanguage(locale);
  };
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);
  return (
    <header>
      <Container className="flex items-center justify-between py-8">
        <Form action="/api/change-locale" method="post" ref={el}>
          <Select
            className="w-auto"
            id="locale"
            name="locale"
            value={locale}
            options={i18nConfig.supportedLngs}
            onChange={async (v: React.ChangeEvent<HTMLSelectElement>) => {
              changeLanguageHandler(v.currentTarget.value);
              el.current && el.current.submit();
            }}
          />
        </Form>
        <Toggle
          value="is-dark-mode"
          checked={isDarkMode}
          onChange={() => {
            if (!isDarkMode) {
              document.documentElement.classList.remove("light");
              document.documentElement.classList.add("dark");
              localStorage.theme = "dark";
            } else {
              document.documentElement.classList.remove("dark");
              document.documentElement.classList.add("light");
              localStorage.theme = "light";
            }
            setIsDarkMode(!isDarkMode);
          }}
        />
      </Container>
    </header>
  );
};
