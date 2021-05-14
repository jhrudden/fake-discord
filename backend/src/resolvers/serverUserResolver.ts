import {
  Arg,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { Server } from "../entity/Server";
import { ServerUser } from "../entity/ServerUser";
import { User } from "../entity/User";
import { isAuth } from "../middlewares/isAuth";

type ServerUserSubPayload = {
  serverId: string;
  user: User;
};

type ServerUserSubArgs = {
  serverId: string;
};

const NEW_SERVER_USER = "NEW_SERVER_USER";
const DELETE_SERVER_USER = "DELETE_SERVER_USER";

@Resolver()
export class ServerUserResolver {
  @Query(() => [User])
  @UseMiddleware(isAuth)
  async usersOnServer(@Arg("serverId") serverId: string) {
    try {
      const users = await ServerUser.find({
        join: {
          alias: "serverUser",
          innerJoinAndSelect: { user: "serverUser.user" },
        },
        where: {
          serverId: serverId,
        },
      });
      const usersOnServer = [] as User[];
      users.map((user) => usersOnServer.push((user as any).__user__));

      return usersOnServer;
    } catch (e) {
      console.log(e);
      return [] as User[];
    }
  }

  @Query(() => [Server])
  @UseMiddleware(isAuth)
  async servers(@Arg("userId") userId: string) {
    try {
      const servers = await ServerUser.find({
        join: {
          alias: "serverUser",
          innerJoinAndSelect: { server: "serverUser.server" },
        },
        where: {
          userId: userId,
        },
      });
      const usersServers = [] as Server[];
      servers.map((server) => usersServers.push((server as any).__server__));

      return usersServers;
    } catch (e) {
      console.log(e);
      return [] as Server[];
    }
  }

  // @todo: may want to require authentication on this subscription
  @Subscription(() => User!, {
    topics: [NEW_SERVER_USER],
    filter: ({
      payload,
      args,
    }: ResolverFilterData<ServerUserSubPayload, ServerUserSubArgs>) =>
      args.serverId === payload.serverId,
  })
  async newServerUser(
    @Arg("serverId") serverId: string,
    @Root() newUserPayload: ServerUserSubPayload
  ) {
    return newUserPayload.user;
  }

  // @todo: may want to require authentication on this subscription
  @Subscription(() => User!, {
    topics: [DELETE_SERVER_USER],
    filter: ({
      payload,
      args,
    }: ResolverFilterData<ServerUserSubPayload, ServerUserSubArgs>) =>
      args.serverId === payload.serverId,
  })
  async deleteServerUser(
    @Arg("serverId") serverId: string,
    @Root() deletedUserPayload: ServerUserSubPayload
  ) {
    return deletedUserPayload.user;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addUserToServer(
    @Arg("userId") userId: string,
    @Arg("serverId") serverId: string,
    @PubSub() pubSub: PubSubEngine
  ) {
    try {
      const userAlreadyOnServer = await ServerUser.findOne({
        where: {
          serverId,
          userId,
        },
      });
      const user = await User.findOne({ where: { id: userId } });
      if (!userAlreadyOnServer && user) {
        await ServerUser.create({ serverId, userId }).save();
        const payload: ServerUserSubPayload = { serverId, user };
        await pubSub.publish(NEW_SERVER_USER, payload);
        return true;
      }
    } catch (e) {
      console.log(e);
    }

    return false;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUserFromServer(
    @Arg("userId") userId: string,
    @Arg("serverId") serverId: string,
    @PubSub() pubSub: PubSubEngine
  ) {
    try {
      const userOnServer = await ServerUser.findOne({
        where: {
          serverId,
          userId,
        },
      });
      const user = await User.findOne({ where: { id: userId } });
      if (userOnServer && user) {
        await ServerUser.delete({ serverId, userId });
        const payload: ServerUserSubPayload = { serverId, user };
        await pubSub.publish(DELETE_SERVER_USER, payload);
        return true;
      }
    } catch (e) {
      console.log(e);
    }

    return false;
  }
}
