import gql from "graphql-tag";

export const meQuery = gql`
  query me {
    me {
      id
      email
      username
    }
  }
`;
