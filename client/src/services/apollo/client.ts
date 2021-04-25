import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { authMiddleware, errorLink, httpLink } from "./links";

const cache = new InMemoryCache({});

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, authMiddleware, httpLink]),
});
