import { NonEmptyArray } from "type-graphql";
import { ServerResolver } from "./serverResolver";
import { ServerUserResolver } from "./serverUserResolver";
import { UserResolver } from "./userResolver";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  ServerResolver,
  ServerUserResolver,
];
