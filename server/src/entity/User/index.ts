import "reflect-metadata";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class User {
  @Field()
  id: string;
  @Field()
  email: string;
  @Field(() => Int)
  tokenVersion: number;
}
