import gql from "graphql-tag";

export const usersQuery = gql`
  query Users {
    users {
      email
      id
    }
  }
`;
