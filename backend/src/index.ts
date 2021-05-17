import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import "reflect-metadata";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { resolvers } from "./resolvers";
import { refreshToken } from "./services/token";
import { subscribe, execute } from "graphql";

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

  const schema = await buildSchema({ resolvers });
  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  ws.listen(4000, () => {
    console.log("App has started");
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema: schema,
      },
      {
        server: ws,
      }
    );
  });
})();
