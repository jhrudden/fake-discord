import React from "react";
import ServerSidebar from "../components/ServerSidebar";
import { useCurrentUserQuery } from "../services/graphql/graphql";

type Props = {};

const Channel: React.FC<Props> = () => {
  const { data, loading } = useCurrentUserQuery();
  return <div className="flex">{!loading && data && <ServerSidebar />}</div>;
};

export default Channel;
