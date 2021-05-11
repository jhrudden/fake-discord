import React from "react";
import ServerSidebar from "../components/ServerSidebar";
import { useMeQuery } from "../services/graphql/graphql";

type Props = {};

const Home: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  if (loading && !data) return <div>loading...</div>;
  return (
    <div className="flex">
      {data!.me && <ServerSidebar user={data!.me} />}
      {!loading && data && <div className="">{JSON.stringify(data.me)}</div>}
    </div>
  );
};

export default Home;
