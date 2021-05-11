import gql from "graphql-tag";

export const registerMutation = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password)
  }
`;
