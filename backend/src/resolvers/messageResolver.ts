import { ServerUser } from "../entity/ServerUser";
import {
  Arg,
  Ctx,
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
import { Context } from "vm";
import { Message } from "../entity/Message";
import { isAuth } from "../middlewares/isAuth";
import { MessageResponse } from "../types/messageResponse";
import { Server } from "../entity/Server";

type MessageSubPayload = {
  messageRes: MessageResponse;
  serverId: string;
};

type MessageSubArgs = {
  serverId: string;
};

type DeleteMessageSubArgs = {
  serverId: string;
};

const NEW_SERVER_MESSAGE = "NEW_SERVER_MESSAGE";
const DELETE_SERVER_MESSAGE = "DELETE_SERVER_MESSAGE";

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  async userMessages(
    @Arg("serverId") serverId: string,
    @Arg("userId", { nullable: true }) userId: string
  ) {
    const serverUser = await ServerUser.findOne({
      relations: ["messages"],
      where: {
        userId,
        serverId,
      },
    });
    if (serverUser && serverUser.messages) {
      return { ...serverUser.messages };
    }
    return [] as Message[];
  }

  @Query(() => [MessageResponse])
  @UseMiddleware(isAuth)
  async serverMessages(@Arg("serverId") serverId: string) {
    const server = await Server.findOne({
      where: { id: serverId },
      relations: ["messages", "messages.author", "messages.author.user"],
    });
    if (server) {
      const res: MessageResponse[] = server.messages.map((message) => {
        return { message, author: message.author.user };
      });
      return res;
    }
    console.log(server);
    return [] as MessageResponse[];
  }

  @Subscription(() => MessageResponse!, {
    topics: [NEW_SERVER_MESSAGE],
    filter: ({
      payload,
      args,
    }: ResolverFilterData<MessageSubPayload, MessageSubArgs>) =>
      args.serverId === payload.serverId,
  })
  async newServerMessage(
    @Arg("serverId") serverId: string,
    @Root() newMessagePayload: MessageSubPayload
  ) {
    console.log(newMessagePayload);
    return newMessagePayload.messageRes;
  }

  @Subscription(() => MessageResponse!, {
    topics: [DELETE_SERVER_MESSAGE],
    filter: ({
      payload,
      args,
    }: ResolverFilterData<MessageSubPayload, DeleteMessageSubArgs>) =>
      args.serverId === payload.serverId,
  })
  async deleteServerMessage(
    @Arg("serverId") serverId: string,
    @Root() deleteMessagePayload: MessageSubPayload
  ) {
    return deleteMessagePayload.messageRes;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async postMessageToServer(
    @Arg("serverId") serverId: string,
    @Arg("content") content: string,
    @Ctx() { payload }: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    try {
      const serverUser = await ServerUser.findOne({
        relations: ["server", "user"],
        where: {
          serverId,
          userId: payload!.userId,
        },
      });

      const server = serverUser?.server;
      if (serverUser && server) {
        const user = serverUser?.user;
        const message = await Message.create({
          author: serverUser,
          content,
          server,
        }).save();
        const payload: MessageSubPayload = {
          serverId,
          messageRes: { message, author: user },
        };
        await pubSub.publish(NEW_SERVER_MESSAGE, payload);
        return true;
      }
      return false;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteMessageFromServer(
    @Arg("serverId") serverId: string,
    @Arg("messageId") messageId: string,
    @PubSub() pubSub: PubSubEngine
  ) {
    try {
      const message = await Message.findOne({
        relations: ["author", "author.user"],
        where: {
          messageId,
          server: serverId,
        },
      });
      if (message) {
        const user = message?.author?.user;
        await Message.delete({ messageId });
        const payload: MessageSubPayload = {
          serverId,
          messageRes: { message, author: user },
        };
        await pubSub.publish(DELETE_SERVER_MESSAGE, payload);
        return true;
      }
      return false;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }
}
