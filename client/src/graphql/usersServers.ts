import gql from "graphql-tag";

export const usersServersQuery = gql`
  query UsersServers {
    usersServers {
      id
      serverName
    }
  }
`;
