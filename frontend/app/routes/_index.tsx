import { Layout } from "~/components/Templates/Layout";
import { LoaderArgs, json } from "@remix-run/node";
import { Link, V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { graphQLClient } from "lib/apollo";
import { getAllArticlesByLocale } from "lib/apollo/query";
import type {
  GetAllArticlesByLocaleQuery,
  GetAllArticlesByLocaleQueryVariables,
} from "types/generated";
import { H2, Span } from "~/components/Atoms/Typography";
import { useTranslation } from "react-i18next";
import { remixI18next } from "lib/i18n";
import { getUserLocale } from "~/sessions.server";

export const loader = async ({ request }: LoaderArgs) => {
  const t = await remixI18next.getFixedT(request, "common");
  const locale = await getUserLocale(request);
  const valiables: GetAllArticlesByLocaleQueryVariables = {
    locale: locale,
  };
  const res = await graphQLClient.query<GetAllArticlesByLocaleQuery>({
    query: getAllArticlesByLocale,
    variables: valiables,
  });

  return json({ response: res.data, translation: { title: t("title") } });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data.translation.title }];
};

export default function Index() {
  const { response } = useLoaderData<typeof loader>();

  return (
    <div>
      <ul className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-3 lg:gap-x-12 lg:gap-y-12">
        {response.articles?.data.map((d, idx) => {
          return (
            <li key={idx}>
              {d.attributes?.slug ? (
                <Link to={d.attributes?.slug}>
                  <H2>{d.attributes?.title}</H2>
                  <Span>
                    <time dateTime={d.attributes?.publishedAt}>
                      {new Date(d.attributes?.publishedAt).toLocaleDateString()}
                    </time>
                  </Span>
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
