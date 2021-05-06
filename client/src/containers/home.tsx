import React from "react";
import ServerSidebar from "../components/ServerSidebar";
import { useCurrentUserQuery } from "../services/graphql/graphql";

type Props = {};

const Home: React.FC<Props> = () => {
  const { data, loading } = useCurrentUserQuery();
  return (
    <div className="flex">
      <ServerSidebar />
      {!loading && data && (
        <div className="">{JSON.stringify(data.currentUser)}</div>
      )}
    </div>
  );
};

export default Home;
