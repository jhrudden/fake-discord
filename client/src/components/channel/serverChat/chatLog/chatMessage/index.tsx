import React, { useState } from "react";
import { useDeleteMessageFromServerMutation } from "../../../../../services/graphql/graphql";
import { Message } from "../../../../../types/message";
import { User } from "../../../../../types/user";
import { userIdVar } from "../../../../../util/userId";
import { useModal } from "../../../../shared/hooks/useModal";
import Modal from "../../../../shared/modal";
import ChatModal from "./chatModal";

interface Props {
    message: Message;
    author: User;
    serverId: string;
}

const ChatMessage: React.FC<Props> = ({ message, author, serverId }) => {
    const [deleteMessage] = useDeleteMessageFromServerMutation();
    const { isShown, toggleModal } = useModal();
    const [hovered, setHovered] = useState(false);
    const userId = userIdVar();
    const messageTimestamp = new Date(message.datePosted);
    const formattedTime = messageTimestamp.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
    });

    const handleDeleteMessage = async () => {
        await deleteMessage({
            variables: { messageId: message.messageId, serverId },
        });
        toggleModal();
    };

    return (
        <div
            className="flex flex-row text-white relative w-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex">
                <span className="text-gray-light text-xs w-14">
                    {formattedTime}
                </span>
                <span className="text-lg px-2 font-bold">
                    {author.username}
                </span>
            </div>
            <div className="flex">
                <span className="font-light text-bottom overflow-ellipsis mr-2">
                    {message.content}
                </span>
            </div>
            {hovered && author.id === userId && (
                <div
                    className="absolute w-4 h-2 bg-gray-darkest right-4 text-xl cursor-pointer shadow-2xl"
                    onClick={toggleModal}
                >
                    ...
                </div>
            )}
            <Modal isShown={isShown} toggleModal={toggleModal}>
                <ChatModal
                    handleDeleteMessage={handleDeleteMessage}
                    toggleModal={toggleModal}
                    author={author}
                    message={message}
                    formattedTime={formattedTime}
                />
            </Modal>
        </div>
    );
};

export default ChatMessage;
