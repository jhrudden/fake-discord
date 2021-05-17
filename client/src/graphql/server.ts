import gql from "graphql-tag";

export const createServerMutation = gql`
  mutation CreateServer($serverName: String!) {
    createServer(serverName: $serverName)
  }
`;
