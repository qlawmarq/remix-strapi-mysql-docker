import { LoaderArgs, json } from "@remix-run/node";
import { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { graphQLClient } from "~/lib/apollo";
import { getArticlesByLocaleAndSlug } from "~/lib/apollo/query";
import type {
  GetArticlesByLocaleAndSlugQuery,
  GetArticlesByLocaleAndSlugQueryVariables,
} from "types/generated";
import { H1, Span } from "~/components/Atoms/Typography";
import { Markdown } from "~/components/Molecules/Markdown";
import { readJsonFileByPath, writeJsonFileToPath } from "~/lib/utils/json";
import { ApolloQueryResult } from "@apollo/client";
import { APP_DATA_RETRIEVAL_METHOD } from "~/lib/utils/constants";
import { getArticle } from "~/lib/contents";

export const loader = async ({ params, request }: LoaderArgs) => {
  const locale = params.locale;
  const slug = params.slug;

  if (locale === undefined || slug === undefined) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const data = await getArticle({ locale, slug: slug });
  return json({ response: data });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data.response.attributes?.title },
    { description: data.response.attributes?.description },
  ];
};

export default function Index() {
  const { response } = useLoaderData<typeof loader>();

  return (
    <div>
      {response.attributes?.title && response.attributes?.content && (
        <>
          <div className="mb-6">
            <H1>{response.attributes.title}</H1>
            <Span>
              <time dateTime={response.attributes.publishedAt}>
                {new Date(response.attributes.publishedAt).toLocaleDateString()}
              </time>
            </Span>
          </div>
          <Markdown>{response.attributes.content}</Markdown>
        </>
      )}
    </div>
  );
}
