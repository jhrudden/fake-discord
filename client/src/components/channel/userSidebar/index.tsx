import React, { useEffect } from "react";
import {
  DeleteServerUserDocument,
  DeleteServerUserSubscription,
  DeleteServerUserSubscriptionVariables,
  NewServerUserDocument,
  NewServerUserSubscription,
  NewServerUserSubscriptionVariables,
  useUsersOnServerQuery,
} from "../../../services/graphql/graphql";
import ServerUserItem from "./serverUserItem";

type Props = {
  serverId: string;
};

const UserSideBar: React.FC<Props> = ({ serverId }) => {
  const { data, loading, error, subscribeToMore } = useUsersOnServerQuery({
    variables: { serverId },
  });
  useEffect(() => {
    const unsubToNewUser = subscribeToMore<
      NewServerUserSubscription,
      NewServerUserSubscriptionVariables
    >({
      document: NewServerUserDocument,
      variables: { serverId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newServerUser = subscriptionData.data.newServerUser;
        const mergedServerUsers = [...prev.usersOnServer, newServerUser];
        return Object.assign({}, prev, {
          usersOnServer: mergedServerUsers,
        });
      },
    });
    const unsubToDeleteUser = subscribeToMore<
      DeleteServerUserSubscription,
      DeleteServerUserSubscriptionVariables
    >({
      document: DeleteServerUserDocument,
      variables: { serverId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const deleteServerUser = subscriptionData.data.deleteServerUser;
        console.log(prev.usersOnServer);
        const updatedServerUsers = [
          ...prev.usersOnServer.filter(
            (userServer) => userServer.id !== deleteServerUser.id
          ),
        ];
        return Object.assign({}, prev, {
          usersOnServer: updatedServerUsers,
        });
      },
    });

    // @todo : below function isn't unsubscribing
    return () => {
      unsubToNewUser();
      unsubToDeleteUser();
    };
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>Error</div>;
  return (
    <div className="hidden md:flex z-1" key={serverId}>
      <div className="w-56 flex flex-col h-screen bg-gray-deepestDark">
        <h1 className="pt-2 pl-4 text-gray-light">
          Users
          <span className="text-sm">
            {data.usersOnServer ? ` – ${data!.usersOnServer!.length}` : ""}
          </span>
        </h1>
        {data.usersOnServer.map((serverUser, key) => (
          <ServerUserItem user={serverUser} key={key} />
        ))}
      </div>
    </div>
  );
};

export default UserSideBar;
