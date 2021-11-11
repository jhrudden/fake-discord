import gql from "graphql-tag";

export const createServerMutation = gql`
  mutation CreateServer($serverName: String!) {
    createServer(serverName: $serverName)
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

export const serverInfoQuery = gql`
  query GetServerInfo($serverId: String!) {
    getServerInfo(serverId: $serverId) {
      serverName
    }
  }
`;
