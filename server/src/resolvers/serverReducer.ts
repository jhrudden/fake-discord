import { Context } from "src/context";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import Server from "../entity/server";
import { isAuth } from "../middlewares/isAuth";
//import UserOnServer from "../entity/userOnServer";
import User from "../entity/user";

@Resolver()
export class ServerResolver {
  @Query(() => [Server])
  async servers(@Ctx() { prisma }: Context) {
    return await prisma.server.findMany({
      include: { users: { include: { user: true } } },
    });
  }

  @Query(() => [User], { nullable: true })
  async serversUsers(
    @Arg("serverId") serverId: string,
    @Ctx() { prisma }: Context
  ) {
    const res = await prisma.server.findUnique({
      where: { id: serverId },
      select: {
        users: {
          select: {
            user: true,
          },
        },
      },
    });

    if (!res) {
      return null;
    }

    if (!res.users) {
      return [] as User[];
    }

    let result: Server[] = [];
    //const result = res.users.reduce(
    //(accum, curr) => [...accum, curr.user],
    //[] as User[]
    //);

    return result;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createServer(
    @Arg("serverName") serverName: string,
    @Ctx() { prisma, payload }: Context
  ) {
    try {
      await prisma.server.create({
        data: {
          serverName,
          users: {
            create: [
              {
                user: {
                  connect: { id: payload?.userId },
                },
              },
            ],
          },
        },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  // @TODO: may want to make this i function that checks if user is owner of server
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteServer(@Arg("serverId") serverId: string) {
    // @TODO: this doesnt work because to delete server I need to delete all UsersOnServer connected
    try {
      //await prisma.userOnServer.delete({
      //where: {
      //server: {
      //serverId: serverId,
      //},
      //},
      //});
      //await prisma.server.delete({
      //where: {
      //id: serverId,
      //},
      //});
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
