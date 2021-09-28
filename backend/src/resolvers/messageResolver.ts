import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Context } from "vm";
import { Message } from "../entity/Message";
import { Server } from "../entity/Server";
import { isAuth } from "../middlewares/isAuth";

@Resolver()
export class MessageResolver {
  // TODO: maybe check if user is in channel
  @Query(() => [Message])
  async messages(
    @Arg("serverId") serverId: string,
    @Arg("userId", { nullable: true }) userId: string
  ) {
    const server = await Server.findOne({
      relations: ["messages"],
      where: {
        id: serverId,
      },
    });
    // TODO: actually get messages
    console.log(server);
    if (server) {
      const messages = await server.messages;
      console.log(messages);
      if (messages) {
        return messages;
      }
    }
    return [] as Message[];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async postMessage(
    @Arg("serverId") serverId: string,
    @Arg("content") content: string,
    @Ctx() { payload }: Context
  ) {
    const server = await Server.findOne({
      join: {
        alias: "server",
        leftJoinAndSelect: {
          users: "server.users",
        },
      },
      where: { id: serverId },
    });
    if (server) {
      console.log("server", server);
      console.log(await (server as any).__users__);
      //const user = (await (server as any).__user__).find(
      //(user: ServerUser) => user.userId === payload!.userId
      //);
      //console.log(user);
      //if (user) {
      //const message = new Message();
      //message.author = user!;
      //message.content = content;
      //message.server = server;
      //await message.save();
      //return true;
      //}
    }
    return false;
  }
}
