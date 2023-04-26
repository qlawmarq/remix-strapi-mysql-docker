import { LoaderArgs, json } from "@remix-run/node";
import { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { graphQLClient } from "~/lib/apollo";
import { getAboutByLocale } from "~/lib/apollo/query";
import type {
  GetAboutByLocaleQuery,
  GetAboutByLocaleQueryVariables,
} from "types/generated";
import { H1 } from "~/components/Atoms/Typography";
import { getUserLocale } from "~/sessions.server";
import { Markdown } from "~/components/Molecules/Markdown";
import { readJsonFileByPath, writeJsonFileToPath } from "~/lib/utils/json";
import { ApolloQueryResult } from "@apollo/client";
import { APP_DATA_RETRIEVAL_METHOD } from "~/lib/utils/constants";

export const loader = async ({ request }: LoaderArgs) => {
  const locale = await getUserLocale(request);

  // Load all articles
  const articlesValiables: GetAboutByLocaleQueryVariables = {
    locale: locale,
  };
  const aboutJsonPath = `locales/${locale}/generated/about.json`;
  const res =
    APP_DATA_RETRIEVAL_METHOD === "json"
      ? (readJsonFileByPath(
          aboutJsonPath
        ) as ApolloQueryResult<GetAboutByLocaleQuery>)
      : await graphQLClient.query<GetAboutByLocaleQuery>({
          query: getAboutByLocale,
          variables: articlesValiables,
        });
  APP_DATA_RETRIEVAL_METHOD === "api" &&
    writeJsonFileToPath(res, aboutJsonPath);

  const data = res.data.about?.data?.attributes;

  if (data === undefined) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json({ response: data });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data.response?.title },
    { description: data.response?.description },
  ];
};

export default function Index() {
  const { response } = useLoaderData<typeof loader>();

  return (
    <div>
      <H1 className="mb-6">{response?.title}</H1>
      {response?.content && <Markdown>{response.content}</Markdown>}
    </div>
  );
}
