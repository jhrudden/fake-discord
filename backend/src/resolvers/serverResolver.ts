import { ServerInfo } from "../types/serverInfo";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Server } from "../entity/Server";
import { ServerUser } from "../entity/ServerUser";
import { isAuth } from "../middlewares/isAuth";
import { Context } from "../types/context";

@Resolver()
export class ServerResolver {
  @Query(() => ServerInfo, { nullable: true })
  @UseMiddleware(isAuth)
  async getServerInfo(@Arg("serverId") serverId: string) {
    try {
      const server = await Server.findOne({ where: { id: serverId } });
      if (server) {
        const info = { serverName: server!.serverName };
        console.log(info);
        return info;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createServer(
    @Arg("serverName") serverName: string,
    @Ctx() { payload }: Context
  ) {
    try {
      const { id } = await Server.create({ serverName: serverName }).save();
      await ServerUser.create({ serverId: id, userId: payload!.userId }).save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
