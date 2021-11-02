import React from "react";
import ChatLog from "./chatLog";
import UserInput from "./userInput";

interface Props {
  serverId: string;
}

const ServerChat: React.FC<Props> = ({ serverId }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-darker">
      <ChatLog serverId={serverId} />
      <UserInput serverId={serverId} />
    </div>
  );
};

export default ServerChat;
