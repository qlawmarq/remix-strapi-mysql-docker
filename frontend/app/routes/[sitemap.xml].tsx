import { LoaderArgs } from "@remix-run/node";
import {
  getAboutContents,
  getAllArticlesContents,
  getHomeContents,
} from "~/lib/contents";
import { i18nConfig } from "~/lib/i18n";

export const loader = async ({ request }: LoaderArgs) => {
  // handle "GET" request
  const url = new URL(request.url).origin;
  let content = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  for (const locale of i18nConfig.supportedLngs) {
    const home = await getHomeContents({ locale });
    content += `
      <url>
        <loc>${url}/${locale}</loc>
        <lastmod>${home.data.home?.data?.attributes?.updatedAt}</lastmod>
      </url>
    `;
    const about = await getAboutContents({ locale });
    content += `
      <url>
        <loc>${url}/${locale}/about</loc>
        <lastmod>${about.data.about?.data?.attributes?.updatedAt}</lastmod>
      </url>
    `;
    const articles = await getAllArticlesContents({ locale });
    const arrayArticles = articles.data.articles?.data || [];
    for (const article of arrayArticles) {
      content += `
      <url>
        <loc>${url}/${locale}/article/${article.attributes?.slug}</loc>
        <lastmod>${article.attributes?.updatedAt}</lastmod>
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
