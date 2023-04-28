import { Link } from "@remix-run/react";
import { Container } from "~/components/Atoms/Container";
import { Span } from "~/components/Atoms/Typography";

export const Footer = ({ locale }: { locale: string }) => {
  return (
    <footer className="border-t-color mt-10 border-t border-gray-300 py-8">
      <Container>
        <ul className="mb-6 flex flex-wrap items-center">
          <li>
            <Span className="mr-4">
              <Link to={`${locale}`}>Home</Link>
            </Span>
          </li>
          <li>
            <Span className="mr-4">
              <Link to={`${locale}/about`}>About</Link>
            </Span>
          </li>
        </ul>
      </Container>
    </footer>
  );
};
