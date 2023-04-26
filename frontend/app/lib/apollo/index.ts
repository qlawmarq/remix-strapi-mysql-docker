import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // handle graphql error
    console.log(graphQLErrors);
  }

  if (networkError) {
    // handle network error
    console.log(networkError);
    process.env.APP_DATA_RETRIEVAL_METHOD = "json";
  }
});

const httpLink = new HttpLink({
  uri: process.env.APP_GRAPHQL_URL || "http://localhost:1337/graphql",
});

const appLink = from([errorLink, httpLink]);

export const graphQLClient = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: appLink,
});
