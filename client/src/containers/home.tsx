import React from "react";
import ServerSidebar from "../components/shared/serverSidebar";
import { useMeQuery } from "../services/graphql/graphql";

type Props = {};

const Home: React.FC<Props> = () => {
  const { data, loading, error } = useMeQuery({ fetchPolicy: "cache-only" });
  if (loading) return <div>loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div className="flex">
      <ServerSidebar />
      <div className="">{JSON.stringify(data!.me)}</div>
    </div>
  );
};

export default Home;
