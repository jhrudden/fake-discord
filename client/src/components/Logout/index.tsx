import React from "react";
import { useLogoutMutation } from "../../services/graphql/graphql";
import { accessTokenVar } from "../../util/accessToken";

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
