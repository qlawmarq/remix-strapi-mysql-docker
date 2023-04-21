import type { ReactNode } from "react";

import { Footer } from "~/components/Organisms/Footer";
import { Header } from "~/components/Organisms/Header";
import { Container } from "~/components/Atoms/Container";

interface LayoutPropsInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutPropsInterface) => {
  return (
    <main>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </main>
  );
};
