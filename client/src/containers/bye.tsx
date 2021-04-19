import React from "react";
import { useByeQuery } from "../hooks/graphql/graphql";

type Props = {};

const Bye: React.FC<Props> = () => {
  const { data, loading, error } = useByeQuery({ fetchPolicy: "network-only" });

  if (loading) return <div>Loading..</div>;

  if (error) {
    return <div>Not Logged In</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }
  return <div>{data.bye}</div>;
};

export default Bye;
