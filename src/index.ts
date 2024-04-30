import { Elysia, error } from "elysia";
import { env } from "./env";
import connectToDatabase from "./db/connection";
import { cors } from "@elysiajs/cors";
import { Routes } from "./routes";
import { swagger } from "@elysiajs/swagger";
import { AuthRoutes } from "./routes/auth/auth.routes";
import { verify } from "jsonwebtoken";

function runServer() {
  const app = new Elysia();
  app.use(cors());
  app.use(AuthRoutes());
  app.guard(
    {
      beforeHandle: ({ headers }) => {
        const authToken = headers.authorization;

        if (!authToken) {
          return new Response("Auth token does'nt provided");
        }

        const [, token] = authToken.split(" ");
        try {
          if (env.JWT_SECRETS === undefined) {
            throw new Error("Error to sync enviorement variable");
          }

          const decoded = verify(token, env.JWT_SECRETS);
          return;
        } catch (err: any) {
          return {
            message: "Invalid Token",
          };
        }
      },
    },
    (app) => app.use(Routes())
  );

  app.use(
    swagger({
      path: "/swagger",
    })
  );
  app.listen(env.PORT, () => {
    console.log(
      `Servidor rodando em: http://${app.server?.hostname}:${env.PORT}`
    );
  });
}

connectToDatabase
  .then(() => {
    console.log("database conectada");
    runServer();
  })
  .catch(console.dir);
