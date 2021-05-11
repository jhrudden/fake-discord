import gql from "graphql-tag";

export const serversQuery = gql`
  query Servers($userId: String!) {
    servers(userId: $userId) {
      id
      serverName
    }
  }
`;
