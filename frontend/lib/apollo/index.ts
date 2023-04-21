import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
  uri: process.env.APP_GRAPHQL_URL || "http://localhost:1337/graphql",
});

export const graphQLClient = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: link,
});
