import { compare, hash } from "bcryptjs";
import "reflect-metadata";
import Server from "../entity/server";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../Auth";
import { Context } from "../context";
import User from "../entity/user";
import { isAuth } from "../middlewares/isAuth";
import { LoginResponse } from "../types/loginResponse";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { prisma }: Context) {
    return prisma.user.findMany();
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  async currentUser(@Ctx() context: Context) {
    const { prisma, payload } = context;
    const res = prisma.user.findUnique({
      where: {
        id: payload!.userId,
      },
      include: {
        servers: {
          include: {
            server: true,
          },
        },
      },
    });

    return res;
  }

  @Query(() => [Server])
  @UseMiddleware(isAuth)
  async usersServers(@Ctx() context: Context) {
    const { prisma, payload } = context;
    const res = await prisma.user.findUnique({
      where: { id: payload?.userId },
      select: {
        servers: {
          select: {
            server: true,
          },
        },
      },
    });
    if (!res || !res.servers) {
      return [] as Server[];
    }

    const result: Server[] = [];
    //const result = res.servers.reduce(
    //(accum, curr) => [...accum, curr.server],
    //[] as Server[]
    //);

    return result;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { prisma, res }: Context
  ): Promise<LoginResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User does not exist");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid password");
    }

    // login success
    sendRefreshToken(res, createRefreshToken(user.id, user.tokenVersion));

    return {
      accessToken: createAccessToken(user.id),
      user,
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { prisma }: Context
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          servers: {},
        },
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: Context) {
    sendRefreshToken(res, "");
    return true;
  }
}
