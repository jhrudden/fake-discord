import gql from "graphql-tag";

export const registerMutation = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;
