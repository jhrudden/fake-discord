import React from "react";
import { useUsersServersQuery } from "../../services/graphql/graphql";
import {
  AddServerItem,
  HomeServerItem,
  ServerItem,
} from "./serverUtilityItems";

type Props = {};

const ServerSidebar: React.FC<Props> = () => {
  const { data, loading, refetch } = useUsersServersQuery();
  return (
    <div className="hidden sm:flex sticky">
      <div className="w-20 flex flex-col h-screen bg-gray-deepestDark">
        {/* Home button  */}
        <HomeServerItem />
        <div className="w-1/2 h-supa-small mx-auto bg-gray-dark rounded-xl mt-2 mb-1"></div>
        {/* Server Items*/}
        {!loading &&
          data &&
          data.usersServers!.map((server) => (
            <ServerItem server={server} key={server.id} />
          ))}
        {/* Add button  */}
        <AddServerItem refetch={refetch} />
      </div>
    </div>
  );
};

export default ServerSidebar;
