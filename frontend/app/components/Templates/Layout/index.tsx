import type { ReactNode } from "react";

import { Footer } from "~/components/Organisms/Footer";
import { Header } from "~/components/Organisms/Header";
import { Container } from "~/components/Atoms/Container";

interface LayoutPropsInterface {
  children: ReactNode;
  locale: string;
}

export const Layout = ({ children, locale }: LayoutPropsInterface) => {
  return (
    <main>
      <Header locale={locale} />
      <Container>{children}</Container>
      <Footer locale={locale} />
    </main>
  );
};
