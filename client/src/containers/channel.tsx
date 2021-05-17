import React from "react";
import { useLocation } from "react-router";
import UserSideBar from "../components/channel/userSidebar";
import ServerSidebar from "../components/shared/serverSidebar";
import {
  useAddUserToServerMutation,
  useDeleteServerFromUserMutation,
  useUsersOnServerQuery,
} from "../services/graphql/graphql";
import { userIdVar } from "../util/userId";

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
  const [addUserMut] = useAddUserToServerMutation();
  const [deleteUserMut] = useDeleteServerFromUserMutation();

  const addUser = async () => {
    await addUserMut({
      variables: {
        userId: "5f845659-4b8c-4b0a-84d1-264eb8eeb48c",
        serverId: "b7c9d3ff-b690-437b-bf20-f8dfdeb65cbc",
      },
    });
  };
  const deleteUser = async () => {
    await deleteUserMut({
      variables: {
        userId: "5f845659-4b8c-4b0a-84d1-264eb8eeb48c",
        serverId: "b7c9d3ff-b690-437b-bf20-f8dfdeb65cbc",
      },
    });
  };
  if (loading) return <div>Loading..</div>;
  if (error) return <div>Error</div>;
  return (
    <div className="flex">
      <ServerSidebar />
      <UserSideBar serverId={serverId} />
      <button
        onClick={addUser}
        className="block bg-gray-light h-8 ring-black ring-2 m-10"
      >
        Add User
      </button>
      <button
        onClick={deleteUser}
        className="block bg-gray-light h-8 ring-black ring-2 m-10"
      >
        Delete User
      </button>
    </div>
  );
};

export default Channel;
