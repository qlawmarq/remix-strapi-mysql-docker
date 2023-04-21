import { Link } from "@remix-run/react";
import { Container } from "~/components/Atoms/Container";
import { Span } from "~/components/Atoms/Typography";

export const Footer = () => {
  return (
    <footer className="border-t-color border-gray200 mt-10 border-t">
      <Container className="py-8">
        <ul className="mb-6 flex flex-wrap items-center">
          <li>
            <Span className="mr-4">
              <Link to="/">Home</Link>
            </Span>
          </li>
          <li>
            <Span className="mr-4">
              <Link to="/about">About</Link>
            </Span>
          </li>
        </ul>
      </Container>
    </footer>
  );
};
