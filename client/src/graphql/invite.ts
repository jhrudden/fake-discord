import gql from "graphql-tag";

export const createServerInviteMutation = gql`
  mutation CreateServerInvite($serverId: String!) {
    createServerInvite(serverId: $serverId) {
      url
    }
  }
`;

export const getValidInviteQuery = gql`
  query GetValidInvite($inviteUrl: String!) {
    getValidInvite(inviteUrl: $inviteUrl) {
      serverId
    }
  }
`;
