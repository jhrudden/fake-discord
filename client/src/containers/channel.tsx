import React from "react";
import { useLocation } from "react-router";
import ChatBar from "../components/channel/chatBar";
import ServerChat from "../components/channel/serverChat";
import UserSideBar from "../components/channel/userSidebar";
import ServerSidebar from "../components/shared/serverSidebar";
import {
  useGetServerInfoQuery,
  useUsersOnServerQuery,
} from "../services/graphql/graphql";
import { ServerInfo } from "../types/server";

type Props = {};

type LocationState = {
  serverId: string;
};

const Channel: React.FC<Props> = () => {
  const {
    state: { serverId },
  } = useLocation<LocationState>();
  const { loading, error } = useUsersOnServerQuery({
    variables: { serverId: serverId },
  });
  const {
    data,
    loading: loading2,
    error: error2,
  } = useGetServerInfoQuery({
    variables: { serverId },
  });
  if (loading || loading2) return <div>Loading..</div>;
  if (error || error2) return <div>Error</div>;
  return (
    <div className="flex" key={serverId}>
      <ServerSidebar />
      <ChatBar serverId={serverId} {...(data!.getServerInfo! as ServerInfo)} />
      <ServerChat serverId={serverId} />
      <UserSideBar serverId={serverId} />
    </div>
  );
};

export default Channel;
