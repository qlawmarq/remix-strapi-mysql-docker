import { Form } from "@remix-run/react";
import { i18nConfig } from "lib/i18n";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "~/components/Atoms/Container";
import { Select, Toggle } from "~/components/Atoms/Form";

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  const { i18n } = useTranslation();
  const el = useRef<HTMLFormElement>(null);
  const changeLanguageHandler = (locale: string) => {
    i18n.changeLanguage(locale);
  };
  useLayoutEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);
  return (
    <header className="py-6">
      <Container className="flex items-center justify-between">
        <Form action="/api/change-locale" method="post" ref={el}>
          <Select
            className="w-auto"
            id="locale"
            name="locale"
            value={i18n.language}
            options={i18nConfig.supportedLngs}
            onChange={async (v: React.ChangeEvent<HTMLSelectElement>) => {
              changeLanguageHandler(v.currentTarget.value);
              el.current && el.current.submit();
            }}
          />
        </Form>
        <Toggle
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
