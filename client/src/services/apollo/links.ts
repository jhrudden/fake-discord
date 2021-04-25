import { ApolloLink, fromPromise, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { accessTokenVar } from "../../util/accessToken";

export const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

export const authMiddleware = new ApolloLink((operation, forward) => {
  const authToken = accessTokenVar();
  // add the authorization to the headers
  if (authToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  }
  return forward(operation);
});

export const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err?.extensions?.code) {
          case "UNAUTHENTICATED":
            // create an observable that refreshes token by fetching new authToken
            if (accessTokenVar()) {
              return fromPromise(
                fetch("http://localhost:4000/refresh_token", {
                  method: "POST",
                  credentials: "include",
                })
                  .then(async (x) => {
                    const { accessToken } = await x.json();
                    accessTokenVar(accessToken);
                    // modify the operation context with a new token
                    operation.setContext({
                      headers: {
                        ...operation.getContext().headers,
                        authorization: `Bearer ${accessToken}`,
                      },
                    });
                    return forward(operation);
                  })
                  .catch((error) => {
                    return error;
                  })
              );
            } else {
              console.log("no accessToken try logging in");
              break;
            }
          default:
            console.log(err);
        }
      }
    }
    if (networkError) {
      console.log(networkError.message);
      throw networkError;
    }
  }
);
