import { LoaderArgs } from "@remix-run/node";

// https://developers.google.com/search/docs/crawling-indexing/robots/intro

export const loader = ({ request }: LoaderArgs) => {
  const origin = new URL(request.url).origin;
  // handle "GET" request
  const robotText = `
User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
    `;
  // return the text content, a status 200 success response, and set the content type to text/plain
  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
