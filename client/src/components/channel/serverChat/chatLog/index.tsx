import React, { useEffect } from "react";
import {
  DeleteServerMessageDocument,
  DeleteServerMessageSubscription,
  DeleteServerMessageSubscriptionVariables,
  MessageResponse,
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
        const updatedMessageList = [...prev.serverMessages, newServerMessage];
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
  }, [serverId]);

  const renderChatMessage = (message: MessageResponse, key: number) => {
    return (
      <ChatMessage
        key={key}
        message={message!.message}
        author={message!.author}
        serverId={serverId}
      />
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>Error</div>;

  return (
    <div className="relative z-0 flex flex-col h-full mt-auto px-4 overflow-y-auto">
      {data!.serverMessages!.map((datum, index) =>
        renderChatMessage(datum as MessageResponse, index)
      )}
    </div>
  );
};

export default ChatLog;
