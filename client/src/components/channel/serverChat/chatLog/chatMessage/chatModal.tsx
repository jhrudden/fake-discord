import React from "react";
import { Message } from "../../../../../types/message";
import { User } from "../../../../../types/user";

interface Props {
  handleDeleteMessage(): Promise<void>;
  toggleModal: () => void;
  message: Message;
  author: User;
  formattedTime: string;
}

const ChatModal: React.FC<Props> = ({
  handleDeleteMessage,
  toggleModal,
  message,
  author,
  formattedTime,
}) => {
  const authorLogo = author.username
    .split(" ")
    .reduce(
      (acc, curr) => acc.concat(curr.substring(0, 1).toLocaleUpperCase()),
      ""
    );
  return (
    <div className="flex flex-col">
      <div className="p-4 bg-gray-darker">
        <div className="text-2xl font-bold text-white pb-2">Delete Message</div>
        <div className="text-gray-light pb-2 pr-8">
          Are you sure you want to delete this message?
        </div>
        <div className="flex ring-2 rounded ring-gray-deepestDark p-2">
          <div className="flex justify-center items-center">
            <div className="flex m-2 items-center justify-center w-10 h-10 text-xl bg-blue-base rounded-full text-white font-bold">
              {authorLogo}
            </div>
          </div>
          <div className="flex flex-col pl-2">
            <div className="flex items-end pt-1">
              <div className="text-white text-lg pr-2">{author.username}</div>
              <div className="text-gray-base text-xs pb-1">{formattedTime}</div>
            </div>
            <div className="text-gray-light font-light break-all">
              {message.content}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end bg-gray-deepestDark p-4">
        <button
          className="text-white bg-none w-24 h-12 rounded cursor-pointer hover:underline"
          onClick={toggleModal}
        >
          Cancel
        </button>
        <button
          className="text-white bg-red-400 rounded w-24 h-12 cursor-pointer hover:bg-red-500"
          onClick={handleDeleteMessage}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
