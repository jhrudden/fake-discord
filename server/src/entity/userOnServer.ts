import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";
import Server from "./server";
import User from "./user";

@ObjectType()
export default class UserOnServer {
  @Field()
  userId: string;
  @Field()
  serverId: string;
  @Field(() => User)
  user: User;
  @Field(() => Server)
  server: Server;
}
