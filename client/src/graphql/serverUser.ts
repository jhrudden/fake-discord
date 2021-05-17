import gql from "graphql-tag";

export const usersOnServerQuery = gql`
  query UsersOnServer($serverId: String!) {
    usersOnServer(serverId: $serverId) {
      username
      id
    }
  }
`;

export const serversQuery = gql`
  query Servers($userId: String!) {
    servers(userId: $userId) {
      id
      serverName
    }
  }
`;

export const newServerUserSubscription = gql`
  subscription NewServerUser($serverId: String!) {
    newServerUser(serverId: $serverId) {
      username
      id
    }
  }
`;

export const deleteServerUserSubscription = gql`
  subscription DeleteServerUser($serverId: String!) {
    deleteServerUser(serverId: $serverId) {
      username
      id
    }
  }
`;

export const addUserToServerMutation = gql`
  mutation AddUserToServer($serverId: String!, $userId: String!) {
    addUserToServer(serverId: $serverId, userId: $userId)
  }
`;

export const deleteUserFromServerMutation = gql`
  mutation DeleteServerFromUser($serverId: String!, $userId: String!) {
    deleteUserFromServer(serverId: $serverId, userId: $userId)
  }
`;
