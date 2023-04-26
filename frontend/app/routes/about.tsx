import { Layout } from "~/components/Templates/Layout";
import { LoaderArgs, json } from "@remix-run/node";
import { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { graphQLClient } from "~/lib/apollo";
import { getAboutByLocale } from "~/lib/apollo/query";
import type {
  GetAboutByLocaleQuery,
  GetAboutByLocaleQueryVariables,
} from "types/generated";
import { H1, Paragraph } from "~/components/Atoms/Typography";
import { getUserLocale } from "~/sessions.server";
import { Markdown } from "~/components/Molecules/Markdown";

export const loader = async ({ request }: LoaderArgs) => {
  const locale = await getUserLocale(request);
  const valiables: GetAboutByLocaleQueryVariables = {
    locale: locale,
  };
  const res = await graphQLClient.query<GetAboutByLocaleQuery>({
    query: getAboutByLocale,
    variables: valiables,
  });

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
