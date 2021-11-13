import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateServerInviteMutation } from "../../../services/graphql/graphql";
const InviteModal: React.FC<{
  toggleModal: () => void;
  serverName: string;
  serverId: string;
}> = ({ toggleModal, serverName, serverId }) => {
  const [createServerInvite] = useCreateServerInviteMutation({
    variables: { serverId },
  });
  const [serverInvite, setServerInvite] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setIsCopied(false);
    async function getServerInvite() {
      try {
        const invite = await createServerInvite();
        const inviteUrl = "www.fakediscord.com/";
        setServerInvite(inviteUrl + invite.data!.createServerInvite!.url);
      } catch (e) {
        setServerInvite("ERROR!");
      }
    }
    getServerInvite();
  }, []);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      inputRef.current.blur();
      setIsCopied(true);
    }
  };
  return (
    <div className="flex relative flex-col p-2 w-80 sm:w-88 bg-gray-dark">
      <div className="font-bold text-white w-4/5">
        Invite Friends to {serverName}
      </div>
      <div
        className="text-gray-light transition absolute top-3 right-5 hover:text-white"
        onClick={toggleModal}
      >
        <CloseIcon fontSize="medium" />
      </div>
      <div className="w-full flex my-4">
        <input
          ref={inputRef}
          type="text"
          value={serverInvite}
          className="bg-gray-darkerThanDeepest w-full text-white p-2 rounded"
          readOnly
        />
        <div
          onClick={handleCopy}
          className="bg-blue-bright flex items-center justify-center absolute rounded p-2 right-2 w-20 cursor-pointer hover:bg-blue-base"
        >
          {isCopied ? "Copied!" : "Copy"}
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
