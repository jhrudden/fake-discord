import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { refreshToken } from "./services/refreshToken";

(async () => {
  const prisma = new PrismaClient();
  const app = express();

  app.use(cookieParser());

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.post("/refresh_token", async (req, res) => {
    return refreshToken(req, res, prisma);
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      prisma,
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("express server started");
  });
})();
