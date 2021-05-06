import { NonEmptyArray } from "type-graphql";
import { ServerResolver } from "./serverReducer";
import { UserResolver } from "./userResolver";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  ServerResolver,
];
