import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  serverName: string;
  serverId: string;
};

const DropDown: React.FC<{
  serverId: string;
  setToggleDropDown: (b: boolean) => void;
  reference: React.MutableRefObject<any>;
}> = ({ serverId, setToggleDropDown, reference }) => {
  const handleClickOutside = (event: any) => {
    if (
      reference.current !== null &&
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

  const handleInvite = () => {
    alert("invite");
  };
  return (
    <div className="absolute w-full top-12 mt-2 flex justify-center items-center">
      <div className="flex flex-col bg-gray-darkerThanDeepest w-11/12">
        <div className="text-lg text-white font-bold" onClick={handleInvite}>
          Invite
        </div>
      </div>
    </div>
  );
};

const ChatBar: React.FC<Props> = ({ serverName, serverId }) => {
  const serverTitle = serverName.substring(0, 17) + "...";
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const ref = useRef<any>(null);
  useEffect(() => {
    console.log(toggleDropDown);
  }, [toggleDropDown]);
  return (
    <div className="flex relative flex-col bg-gray-deepestDark w-88 cursor-pointer">
      <div
        className="group flex relative items-center border-b-2 border-gray-darkerThanDeepest h-12 hover:bg-gray-darkest"
        onClick={() => setToggleDropDown((curr) => !curr)}
      >
        <div className="text-md text-white font-bold pl-2 select-none">
          {serverTitle}
        </div>
        <div className="absolute right-2 bg-gray-deepestDark text-white group-hover:bg-gray-darkest">
          <KeyboardArrowDownIcon fontSize="large" />
        </div>
        {toggleDropDown && (
          <DropDown
            serverId={serverId}
            setToggleDropDown={setToggleDropDown}
            reference={ref}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBar;
