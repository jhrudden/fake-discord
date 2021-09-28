import { ApolloQueryResult } from "@apollo/client";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { ServersQuery } from "../../../services/graphql/graphql";
import { ServerIdentifier } from "../../../types/server";
import CreateServer from "./createServer";
import { useModal } from "../hooks/useModal";
import Modal from "../modal";

type UtilityProps = {
  children: React.ReactNode;
  selected?: boolean;
  selectedColor?: string;
};

// @todo: make selected state have a cleaner unmount and mount transition
export const UtilityWrapper: React.FC<UtilityProps> = ({
  children,
  selected,
  selectedColor = "bg-blue-bright",
}) => {
  const outerStyle =
    "absolute transition-all duration-300 ease-in-out h-0 w-2 -left-1 top-6 bg-white rounded-r-lg group-hover:h-6 group-hover:top-3";
  const selectedOuter =
    "absolute transition-all duration-600 ease-in-out h-9 w-2 top-1 -left-1 bg-white rounded-r-lg ";
  const selectedInner =
    "flex items-center select-none overflow-hidden justify-center w-12 h-full rounded-xl mx-auto " +
    selectedColor;
  const innerStyle =
    "flex items-center select-none overflow-hidden justify-center transition-all duration-100 ease-in-out w-12 h-full rounded-full mx-auto bg-gray-dark group-hover:rounded-xl group-hover:" +
    selectedColor;
  return (
    <div className="group flex w-full h-12 mt-2 relative cursor-pointer ">
      <div className={`${outerStyle}`}></div>
      <div
        className={`
          ${selectedOuter}
          ${selected ? "block" : "hidden"}`}
      ></div>
      <div className={selected ? selectedInner : innerStyle}>{children}</div>
    </div>
  );
};

type Props = {
  refetch: () => Promise<ApolloQueryResult<ServersQuery>>;
};

export const AddServerItem: React.FC<Props> = ({ refetch }) => {
  // remove this everything taht involves redirecting and path
  const { isShown, toggleModal } = useModal();

  const handleClick = async () => {
    toggleModal();
  };

  const handleClose = async () => {
    await refetch();
    toggleModal();
  };
  return (
    <UtilityWrapper selected={isShown} selectedColor="bg-green-400">
      <div className="w-full h-full">
        <button
          className="text-white w-full h-full font-bold uppercase text-2xl relative"
          onClick={handleClick}
        >
          ＋
        </button>
        <Modal isShown={isShown} toggleModal={toggleModal}>
          <CreateServer handleClose={handleClose} toggleModal={toggleModal} />
        </Modal>
      </div>
    </UtilityWrapper>
  );
};

export const HomeServerItem: React.FC<{}> = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  let selected = pathname === "/@me";
  const handleClick = () => {
    if (!selected) {
      history.push("/@me");
    }
  };
  return (
    <UtilityWrapper selected={selected}>
      <button
        onClick={handleClick}
        className="text-white w-full h-full font-bold uppercase text-xl relative"
      >
        HO
      </button>
    </UtilityWrapper>
  );
};

type ChannelProps = {
  server: ServerIdentifier;
};

export const ServerItem: React.FC<ChannelProps> = ({ server }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { serverName, id } = server;
  const currentPath = "/channels/" + id;
  const channelLogo = serverName
    .split(" ")
    .reduce((acc, curr) => acc.concat(curr.substring(0, 1)), "");
  let selected = pathname === currentPath;

  const handleClick = () => {
    if (!selected) {
      history.push({ pathname: currentPath, state: { serverId: id } });
    }
  };
  return (
    <UtilityWrapper selected={selected}>
      <button
        onClick={handleClick}
        className="text-white w-full h-full font-bold uppercase text-xl relative"
      >
        {channelLogo}
      </button>
    </UtilityWrapper>
  );
};
