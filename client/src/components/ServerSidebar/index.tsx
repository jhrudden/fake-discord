import React from "react";
import { useServersQuery } from "../../services/graphql/graphql";
import { User } from "../../types/user";
import {
  AddServerItem,
  HomeServerItem,
  ServerItem,
} from "./serverUtilityItems";

type Props = {
  user: User;
};

const ServerSidebar: React.FC<Props> = ({ user }) => {
  const { data, loading, refetch } = useServersQuery({
    variables: { userId: user.id },
  });
  return (
    <div className="hidden sm:flex sticky">
      <div className="w-20 flex flex-col h-screen bg-gray-deepestDark">
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
