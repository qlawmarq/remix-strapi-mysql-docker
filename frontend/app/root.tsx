import stylesheet from "~/assets/css/tailwind.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Layout } from "./components/Templates/Layout";
import { getUserLocale } from "~/lib/i18n";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  // Tailwind
  { rel: "stylesheet", href: stylesheet },
  // Google font
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;200;300;400;500;600;700;800;900&display=swap",
  },
];

export async function loader({ params, request }: LoaderArgs) {
  const locale = params.locale ? params.locale : await getUserLocale(request);
  return json({ locale });
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout locale={locale}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
