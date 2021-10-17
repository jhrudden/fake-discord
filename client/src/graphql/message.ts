import gql from "graphql-tag";

export const serverMessagesQuery = gql`
    query ServerMessages($serverId: String!) {
        serverMessages(serverId: $serverId) {
            message {
                content
                messageId
                datePosted
            }
            author {
                id
                username
            }
        }
    }
`;

export const postMessageToServerMutation = gql`
    mutation PostMessageToServer($serverId: String!, $content: String!) {
        postMessageToServer(serverId: $serverId, content: $content)
    }
`;

export const deleteMessageFromServerMutation = gql`
    mutation DeleteMessageFromServer($messageId: String!, $serverId: String!) {
        deleteMessageFromServer(messageId: $messageId, serverId: $serverId)
    }
`;

export const deleteServerMessageSub = gql`
    subscription DeleteServerMessage($serverId: String!) {
        deleteServerMessage(serverId: $serverId) {
            message {
                content
                messageId
                datePosted
            }
            author {
                id
                username
            }
        }
    }
`;

export const newServerMessageSub = gql`
    subscription NewServerMessage($serverId: String!) {
        newServerMessage(serverId: $serverId) {
            message {
                content
                messageId
                datePosted
            }
            author {
                id
                username
            }
        }
    }
`;
