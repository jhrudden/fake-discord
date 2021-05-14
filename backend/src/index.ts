import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { resolvers } from "./resolvers";
import { refreshToken } from "./services/token";

(async () => {
  const app = express();
  const ws = createServer(app);

  await createConnection();

  app.use(cookieParser());

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.post("/refresh_token", async (req, res) => {
    return refreshToken(req, res);
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  apolloServer.installSubscriptionHandlers(ws);

  ws.listen(4000, () => {
    console.log("App has started");
  });
})();
