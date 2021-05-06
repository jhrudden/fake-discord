import "reflect-metadata";
import { Field, Int, ObjectType } from "type-graphql";
import UserOnServer from "./userOnServer";

@ObjectType()
export default class User {
  @Field()
  id: string;
  @Field()
  email: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => Int)
  tokenVersion: number;
  @Field(() => [UserOnServer], { nullable: true })
  servers?: UserOnServer[] | null;
}
