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
import { Card } from "~/components/Atoms/Card";
import { readJsonFileByPath, writeJsonFileToPath } from "~/lib/utils/json";
import { APP_DATA_RETRIEVAL_METHOD } from "~/lib/utils/constants";
import { ApolloQueryResult } from "@apollo/client";

export const loader = async ({ params, request }: LoaderArgs) => {
  // // In case if you wanna load locale json file in server side, use like following:
  // const t = await remixI18next.getFixedT(request, "common");
  // cosole.log(t("title"));

  const locale = params.locale;

  // Load home SEO setting
  const homeValiables: GetHomeByLocaleQueryVariables = {
    locale: locale,
  };
  const homeJsonPath = `locales/${locale}/generated/home.json`;
  const home =
    APP_DATA_RETRIEVAL_METHOD === "json"
      ? (readJsonFileByPath(
          homeJsonPath
        ) as ApolloQueryResult<GetHomeByLocaleQuery>)
      : await graphQLClient.query<GetHomeByLocaleQuery>({
          query: getHomeByLocale,
          variables: homeValiables,
        });
  APP_DATA_RETRIEVAL_METHOD === "api" &&
    writeJsonFileToPath(home, homeJsonPath);

  // Load all articles
  const articlesValiables: GetAllArticlesByLocaleQueryVariables = {
    locale: locale,
  };
  const articlesJsonPath = `locales/${locale}/generated/articles.json`;
  const articles =
    APP_DATA_RETRIEVAL_METHOD === "json"
      ? (readJsonFileByPath(
          articlesJsonPath
        ) as ApolloQueryResult<GetAllArticlesByLocaleQuery>)
      : await graphQLClient.query<GetAllArticlesByLocaleQuery>({
          query: getAllArticlesByLocale,
          variables: articlesValiables,
        });
  APP_DATA_RETRIEVAL_METHOD === "api" &&
    writeJsonFileToPath(articles, articlesJsonPath);

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
