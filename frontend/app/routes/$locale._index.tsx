import { LoaderArgs, json } from "@remix-run/node";
import { Link, V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { H2, Span } from "~/components/Atoms/Typography";
import { Card } from "~/components/Atoms/Card";

import { getAllArticles, getHomeContents } from "~/lib/contents";

export const loader = async ({ params }: LoaderArgs) => {
  const locale = params.locale;

  if (locale === undefined) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  // Load home SEO setting
  const home = await getHomeContents({ locale });

  // Load all articles
  const articles = await getAllArticles({ locale });

  return json({ articles: articles.data.articles, home: home.data.home });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data.home?.data?.attributes?.title },
    { description: data.home?.data?.attributes?.description },
  ];
};

export default function Index() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div>
      <ul className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-3 lg:gap-x-12 lg:gap-y-12">
        {articles?.data.map((d, idx) => {
          return (
            <li key={idx} className="flex flex-col">
              {d.attributes?.slug ? (
                <Link to={`article/${d.attributes?.slug}`}>
                  <Card>
                    <H2>{d.attributes?.title}</H2>
                    <Span>
                      <time dateTime={d.attributes?.publishedAt}>
                        {new Date(
                          d.attributes?.publishedAt
                        ).toLocaleDateString()}
                      </time>
                    </Span>
                  </Card>
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
