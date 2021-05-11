import { ServerUser } from "../entity/ServerUser";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Server } from "../entity/Server";
import { isAuth } from "../middlewares/isAuth";
import { Context } from "../types/context";

@Resolver()
export class ServerResolver {
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
