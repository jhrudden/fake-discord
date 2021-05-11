import { ServerUser } from "../entity/ServerUser";
import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { Server } from "../entity/Server";
import { isAuth } from "../middlewares/isAuth";

@Resolver()
export class ServerUserResolver {
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
}
