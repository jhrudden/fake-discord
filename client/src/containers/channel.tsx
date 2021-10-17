import React from "react";
import { useLocation } from "react-router";
import ServerChat from "../components/channel/serverChat";
import UserSideBar from "../components/channel/userSidebar";
import ServerSidebar from "../components/shared/serverSidebar";
import { useUsersOnServerQuery } from "../services/graphql/graphql";

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
    if (loading) return <div>Loading..</div>;
    if (error) return <div>Error</div>;
    return (
        <div className="flex" key={serverId}>
            <ServerSidebar />
            <ServerChat serverId={serverId} />
            <UserSideBar serverId={serverId} />
        </div>
    );
};

export default Channel;
