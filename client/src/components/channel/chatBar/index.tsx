import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect, useRef, useState } from "react";
import { useModal } from "../../shared/hooks/useModal";
import Modal from "../../shared/modal";
import InviteModal from "./inviteModal";

type Props = {
  serverName: string;
  serverId: string;
};

const InviteToServer: React.FC<{
  serverName: string;
  serverId: string;
  setModalOpen: (b: boolean) => void;
  setToggleDropDown: (b: (a: boolean) => void) => void;
}> = ({ serverId, serverName, setModalOpen, setToggleDropDown }) => {
  const { isShown, toggleModal } = useModal();
  const handleClick = () => {
    setToggleDropDown((curr) => !curr);
    toggleModal();
  };

  useEffect(() => {
    setModalOpen(isShown);
  }, [isShown]);
  return (
    <div>
      <div className="text-lg text-white font-bold" onClick={toggleModal}>
        Invite
      </div>
      <Modal isShown={isShown} toggleModal={handleClick}>
        <InviteModal
          toggleModal={handleClick}
          serverName={serverName}
          serverId={serverId}
        />
      </Modal>
    </div>
  );
};

const DropDown: React.FC<{
  serverId: string;
  setToggleDropDown: (b: boolean) => void;
  reference: React.MutableRefObject<any>;
  serverName: string;
}> = ({ serverId, setToggleDropDown, reference, serverName }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClickOutside = (event: any) => {
    if (
      reference.current !== null &&
      !modalOpen &&
      !reference.current!.contains(event.target)
    ) {
      setToggleDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <div
      className="absolute w-full top-12 mt-2 flex justify-center items-center"
      ref={reference}
    >
      <div className="flex flex-col bg-gray-darkerThanDeepest w-11/12">
        <InviteToServer
          setToggleDropDown={setToggleDropDown as any}
          serverName={serverName}
          serverId={serverId}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
};

const ChatBar: React.FC<Props> = ({ serverName, serverId }) => {
  const serverTitle = serverName.substring(0, 17) + "...";
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const ref = useRef<any>(null);
  return (
    <div className="flex relative flex-col bg-gray-deepestDark w-88 cursor-pointer">
      <div className="group border-b-2 border-gray-darkerThanDeepest hover:bg-gray-darkest">
        <div
          onClick={() => setToggleDropDown(!toggleDropDown)}
          className="flex relative items-center h-12 w-full"
        >
          <div className="text-md text-white font-bold pl-2 select-none">
            {serverTitle}
          </div>
          <div className="absolute right-2 bg-gray-deepestDark text-white group-hover:bg-gray-darkest">
            <KeyboardArrowDownIcon fontSize="large" />
          </div>
        </div>
        {toggleDropDown && (
          <DropDown
            serverId={serverId}
            setToggleDropDown={setToggleDropDown}
            reference={ref}
            serverName={serverName}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBar;
