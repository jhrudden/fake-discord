import { NonEmptyArray } from "type-graphql";
import { InviteResolver } from "./inviteResolver";
import { MessageResolver } from "./messageResolver";
import { ServerResolver } from "./serverResolver";
import { ServerUserResolver } from "./serverUserResolver";
import { UserResolver } from "./userResolver";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  ServerResolver,
  ServerUserResolver,
  MessageResolver,
  InviteResolver,
];
