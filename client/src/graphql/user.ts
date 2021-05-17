import gql from "graphql-tag";

export const usersQuery = gql`
  query Users {
    users {
      email
      username
      id
    }
  }
`;

export const meQuery = gql`
  query me {
    me {
      id
      email
      username
    }
  }
`;

export const logoutMutation = gql`
  mutation Logout {
    logout
  }
`;

export const revokeRefreshTokenMutation = gql`
  mutation RevokeRefreshToken($userId: String!) {
    revokeRefreshToken(userId: $userId)
  }
`;

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        email
        username
      }
    }
  }
`;

export const registerMutation = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password)
  }
`;
