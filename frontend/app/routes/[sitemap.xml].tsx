import { LoaderArgs } from "@remix-run/node";
import { formatISO9075 } from "date-fns";
import {
  getAboutContents,
  getAllArticlesContents,
  getHomeContents,
} from "~/lib/contents";
import { i18nConfig } from "~/lib/i18n";

// https://www.sitemaps.org/protocol.html
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#general-guidelines

const dateformat = (d: Date) => formatISO9075(d, { representation: "date" });

export const loader = async ({ request }: LoaderArgs) => {
  // handle "GET" request
  const origin = new URL(request.url).origin;
  let content = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  for (const locale of i18nConfig.supportedLngs) {
    const home = await getHomeContents({ locale });
    content += `
      <url>
        <loc>${origin}/${locale}</loc>
        <lastmod>${dateformat(
          new Date(home.data.home?.data?.attributes?.updatedAt)
        )}</lastmod>
      </url>
    `;
    const about = await getAboutContents({ locale });
    content += `
      <url>
        <loc>${origin}/${locale}/about</loc>
        <lastmod>${dateformat(
          new Date(about.data.about?.data?.attributes?.updatedAt)
        )}</lastmod>
      </url>
    `;
    const articles = await getAllArticlesContents({ locale });
    const arrayArticles = articles.data.articles?.data || [];
    for (const article of arrayArticles) {
      content += `
      <url>
        <loc>${origin}/${locale}/article/${article.attributes?.slug}</loc>
        <lastmod>${dateformat(
          new Date(article.attributes?.updatedAt)
        )}</lastmod>
      </url>
    `;
    }
  }

  content += `</urlset>`;

  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
