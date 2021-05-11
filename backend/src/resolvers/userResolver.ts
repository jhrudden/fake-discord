import { compare, hash } from "bcryptjs";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Context } from "../types/context";
import { User } from "../entity/User";
import { isAuth } from "../middlewares/isAuth";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../services/token";
import { LoginResponse } from "../types/loginResponse";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: Context) {
    return await User.findOne({ where: { id: payload!.userId } });
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: Context) {
    sendRefreshToken(res, "");
    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshToken(@Arg("userId") userId: string) {
    await getConnection()
      .getRepository("User")
      .increment({ where: { id: userId } }, "tokenVersion", 1);
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({
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
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        username,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
