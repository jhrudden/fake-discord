import React, { useEffect } from "react";
import {
  DeleteServerMessageDocument,
  DeleteServerMessageSubscription,
  DeleteServerMessageSubscriptionVariables,
  NewServerMessageDocument,
  NewServerMessageSubscription,
  NewServerUserSubscriptionVariables,
  useServerMessagesQuery,
} from "../../../../services/graphql/graphql";
import ChatMessage from "./chatMessage";

type Props = {
  serverId: string;
};

const ChatLog: React.FC<Props> = ({ serverId }) => {
  const { data, loading, error, subscribeToMore } = useServerMessagesQuery({
    variables: { serverId },
  });
  useEffect(() => {
    const unsubToNewMessage = subscribeToMore<
      NewServerMessageSubscription,
      NewServerUserSubscriptionVariables
    >({
      document: NewServerMessageDocument,
      variables: { serverId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newServerMessage = subscriptionData.data.newServerMessage;
        const updatedMessageList = {
          ...prev.serverMessages,
          newServerMessage,
        };
        return Object.assign({}, prev, {
          serverMessages: updatedMessageList,
        });
      },
    });

    const unsubToDeletedMessages = subscribeToMore<
      DeleteServerMessageSubscription,
      DeleteServerMessageSubscriptionVariables
    >({
      document: DeleteServerMessageDocument,
      variables: { serverId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const messageToDelete = subscriptionData.data.deleteServerMessage;
        const updatedMessageList = [
          ...prev.serverMessages.filter(
            (item) =>
              item.message.messageId !== messageToDelete.message.messageId
          ),
        ];
        return Object.assign({}, prev, {
          serverMessages: updatedMessageList,
        });
      },
    });

    // TODO: this may not unsub
    return () => {
      unsubToNewMessage();
      unsubToDeletedMessages();
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>Error</div>;

  return (
    <div className="relative z-0 flex flex-col h-full px-4 overflow-auto">
      {data!.serverMessages!.map((datum) => (
        <ChatMessage
          message={datum!.message}
          author={datum!.author}
          serverId={serverId}
        />
      ))}
    </div>
  );
};

export default ChatLog;
