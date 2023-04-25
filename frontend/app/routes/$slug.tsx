import { LoaderArgs, json } from "@remix-run/node";
import { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { graphQLClient } from "lib/apollo";
import { getArticlesByLocaleAndSlug } from "lib/apollo/query";
import type {
  GetArticlesByLocaleAndSlugQuery,
  GetArticlesByLocaleAndSlugQueryVariables,
} from "types/generated";
import { H1, Span } from "~/components/Atoms/Typography";
import { MarkdownComponent } from "~/components/Molecules/Markdown";
import { getUserLocale } from "~/sessions.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const locale = await getUserLocale(request);
  const valiables: GetArticlesByLocaleAndSlugQueryVariables = {
    locale: locale,
    slug: params.slug,
  };
  const res = await graphQLClient.query<GetArticlesByLocaleAndSlugQuery>({
    query: getArticlesByLocaleAndSlug,
    variables: valiables,
  });
  const data = res.data.articles?.data;
  if (data === undefined || data.length !== 1) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json({ response: data[0] });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data.response.attributes?.title }];
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
          <MarkdownComponent>{response.attributes.content}</MarkdownComponent>
        </>
      )}
    </div>
  );
}
