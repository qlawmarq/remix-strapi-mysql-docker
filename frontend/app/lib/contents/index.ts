import type { ApolloQueryResult } from "@apollo/client";
import type {
  GetHomeByLocaleQueryVariables,
  GetHomeByLocaleQuery,
  GetAllArticlesByLocaleQueryVariables,
  GetAllArticlesByLocaleQuery,
  GetAboutByLocaleQuery,
  GetAboutByLocaleQueryVariables,
  GetArticlesByLocaleAndSlugQuery,
  GetArticlesByLocaleAndSlugQueryVariables,
} from "types/generated";
import { graphQLClient } from "~/lib/apollo";
import {
  getAboutByLocale,
  getAllArticlesByLocale,
  getArticlesByLocaleAndSlug,
  getHomeByLocale,
} from "~/lib/apollo/query";
import { APP_DATA_RETRIEVAL_METHOD } from "~/lib/utils/constants";
import { readJsonFileByPath, writeJsonFileToPath } from "~/lib/utils/json";

export const getHomeContents = async ({ locale }: { locale: string }) => {
  // Load home SEO setting
  const homeValiables: GetHomeByLocaleQueryVariables = {
    locale: locale,
  };
  const homeJsonPath = `contents/${locale}/home.json`;
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
  return home;
};

export const getAllArticlesContents = async ({
  locale,
}: {
  locale: string;
}) => {
  const articlesValiables: GetAllArticlesByLocaleQueryVariables = {
    locale: locale,
  };
  const articlesJsonPath = `contents/${locale}/articles.json`;
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
  return articles;
};

export const getAboutContents = async ({ locale }: { locale: string }) => {
  const aboutValiables: GetAboutByLocaleQueryVariables = {
    locale: locale,
  };
  const aboutJsonPath = `contents/${locale}/about.json`;
  const res =
    APP_DATA_RETRIEVAL_METHOD === "json"
      ? (readJsonFileByPath(
          aboutJsonPath
        ) as ApolloQueryResult<GetAboutByLocaleQuery>)
      : await graphQLClient.query<GetAboutByLocaleQuery>({
          query: getAboutByLocale,
          variables: aboutValiables,
        });
  APP_DATA_RETRIEVAL_METHOD === "api" &&
    writeJsonFileToPath(res, aboutJsonPath);
  return res;
};

export const getArticleContents = async ({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) => {
  const valiables: GetArticlesByLocaleAndSlugQueryVariables = {
    locale: locale,
    slug: slug,
  };
  const articleJsonPath = `contents/${locale}/article.${slug}.json`;
  const res =
    APP_DATA_RETRIEVAL_METHOD === "json"
      ? (readJsonFileByPath(
          articleJsonPath
        ) as ApolloQueryResult<GetArticlesByLocaleAndSlugQuery>)
      : await graphQLClient.query<GetArticlesByLocaleAndSlugQuery>({
          query: getArticlesByLocaleAndSlug,
          variables: valiables,
        });
  const data = res.data.articles?.data;
  if (data === undefined || data.length !== 1) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  APP_DATA_RETRIEVAL_METHOD === "api" &&
    writeJsonFileToPath(res, articleJsonPath);
  return data[0];
};
