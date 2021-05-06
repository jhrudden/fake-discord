import gql from "graphql-tag";

export const currentUserQuery = gql`
  query CurrentUser {
    currentUser {
      id
      email
      name
      servers {
        server {
          id
          serverName
        }
      }
    }
  }
`;
