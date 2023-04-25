import { Form } from "@remix-run/react";
import { i18nConfig } from "lib/i18n";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "~/components/Atoms/Container";
import { Select } from "~/components/Atoms/Form";

export const Header = () => {
  const { i18n } = useTranslation();
  const el = useRef<HTMLFormElement>(null);
  const changeLanguageHandler = (locale: string) => {
    i18n.changeLanguage(locale);
  };
  console.log(i18n.language);
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
              console.log(v.currentTarget.value);
              changeLanguageHandler(v.currentTarget.value);
              el.current && el.current.submit();
            }}
          />
        </Form>
      </Container>
    </header>
  );
};
