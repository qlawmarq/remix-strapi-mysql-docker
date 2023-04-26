import { Layout } from "~/components/Templates/Layout";
import { LoaderArgs, json } from "@remix-run/node";
import { Link, V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { graphQLClient } from "~/lib/apollo";
import { getHomeByLocale, getAllArticlesByLocale } from "~/lib/apollo/query";
import type {
  GetHomeByLocaleQuery,
  GetHomeByLocaleQueryVariables,
  GetAllArticlesByLocaleQuery,
  GetAllArticlesByLocaleQueryVariables,
} from "types/generated";
import { H2, Span } from "~/components/Atoms/Typography";
import { remixI18next } from "~/lib/i18n";
import { getUserLocale } from "~/sessions.server";
import { Card } from "~/components/Atoms/Card";

export const loader = async ({ request }: LoaderArgs) => {
  const t = await remixI18next.getFixedT(request, "common");
  t("title");
  const locale = await getUserLocale(request);

  const homeValiables: GetHomeByLocaleQueryVariables = {
    locale: locale,
  };
  const home = await graphQLClient.query<GetHomeByLocaleQuery>({
    query: getHomeByLocale,
    variables: homeValiables,
  });
  const articlesValiables: GetAllArticlesByLocaleQueryVariables = {
    locale: locale,
  };
  const articles = await graphQLClient.query<GetAllArticlesByLocaleQuery>({
    query: getAllArticlesByLocale,
    variables: articlesValiables,
  });

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
                <Link to={d.attributes?.slug}>
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
