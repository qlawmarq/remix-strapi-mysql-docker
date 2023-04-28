import { LoaderArgs, json } from "@remix-run/node";
import { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { H1 } from "~/components/Atoms/Typography";
import { Markdown } from "~/components/Molecules/Markdown";
import { getAbout } from "~/lib/contents";

export const loader = async ({ params, request }: LoaderArgs) => {
  const locale = params.locale;

  if (locale === undefined) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  // Load about
  const res = await getAbout({ locale });

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
