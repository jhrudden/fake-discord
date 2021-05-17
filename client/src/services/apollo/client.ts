import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { authMiddleware, errorLink, terminatingLink } from "./links";

export const cache = new InMemoryCache({});

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, authMiddleware, terminatingLink]),
});
