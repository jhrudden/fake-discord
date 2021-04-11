import "reflect-metadata";
import { compare, hash } from "bcryptjs";
import { Context } from "./context";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import User from "./entity/User";
import { LoginResponse } from "./types";
import { createAccessToken, createRefreshToken } from "./Auth";
import { isAuth } from "./middlewares/isAuth";
import { sendRefreshToken } from "./sendRefreshToken";

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi!";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: Context) {
    console.log(payload);
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => [User])
  async users(@Ctx() { prisma }: Context) {
    return prisma.user.findMany();
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
    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
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
        },
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
