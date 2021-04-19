import React from "react";
import { accessTokenVar } from "../../accessToken";
import { useLogoutMutation } from "../../hooks/graphql/graphql";

type Props = {};

const LogoutButton: React.FC<Props> = () => {
  const [logout, { client }] = useLogoutMutation();
  const logoutAction = async () => {
    accessTokenVar("");
    await logout();
    await client!.resetStore();
  };
  return <button onClick={logoutAction}>logout</button>;
};

export default LogoutButton;
