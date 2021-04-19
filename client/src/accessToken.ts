import { makeVar, ReactiveVar } from "@apollo/client";

export const accessTokenVar: ReactiveVar<string> = makeVar("");
