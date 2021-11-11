import React from "react";
import { useServersQuery } from "../../../services/graphql/graphql";
import { userIdVar } from "../../../util/userId";
import {
  AddServerItem,
  HomeServerItem,
  ServerItem,
} from "./serverUtilityItems";

type Props = {};

const ServerSidebar: React.FC<Props> = () => {
  const userId = userIdVar();
  const { data, loading, refetch } = useServersQuery({
    variables: { userId },
  });
  return (
    <div className="hidden sm:flex sticky">
      <div className="w-20 flex flex-col h-screen bg-gray-darkerThanDeepest">
        {/* Home button  */}
        <HomeServerItem />
        <div className="w-1/2 h-supa-small mx-auto bg-gray-dark rounded-xl mt-2 mb-1"></div>
        {/* Server Items*/}
        {!loading &&
          data &&
          data.servers!.map((server) => (
            <ServerItem server={server} key={server.id} />
          ))}
        {/* Add button  */}
        <AddServerItem refetch={refetch} />
      </div>
    </div>
  );
};

export default ServerSidebar;
