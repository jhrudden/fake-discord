import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ServerInfo {
  @Field()
  serverName: string;
}
