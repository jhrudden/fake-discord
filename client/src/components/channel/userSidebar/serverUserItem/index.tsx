import React from "react";
import { ServerUser } from "../../../../types/serverUser";

type Props = {
  user: ServerUser;
};

const ServerUserItem: React.FC<Props> = ({ user }) => {
  return (
    <div className="h-12 w-full hover:bg-gray-darkest flex items-center cursor-pointer">
      <div className="rounded-full w-10 h-10 bg-blue-base mr-2 ml-3"></div>
      <div className="text-white">{user.username}</div>
    </div>
  );
};

export default ServerUserItem;
