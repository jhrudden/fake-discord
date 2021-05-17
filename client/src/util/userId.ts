import { makeVar, ReactiveVar } from "@apollo/client";

export const userIdVar: ReactiveVar<string> = makeVar("");
