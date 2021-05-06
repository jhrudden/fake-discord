import { Field, ObjectType } from "type-graphql";
import UserOnServer from "./userOnServer";

@ObjectType()
export default class Server {
  @Field()
  id: string;
  @Field()
  serverName: string;
  @Field(() => [UserOnServer], { nullable: true })
  users?: UserOnServer[] | null;
}
