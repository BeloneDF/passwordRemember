import { Elysia } from "elysia";
import { env } from "./env";
import connectToDatabase from "./db/connection";
import { cors } from "@elysiajs/cors";
import { Routes } from "./routes";
import NewError from "./hooks/error";
import { swagger } from "@elysiajs/swagger";
import JWT from "./utils/jwt";

function runServer() {
  const app = new Elysia();
  app.use(cors());
  app.use(Routes());
  app.use(JWT("jwt"));
  app.use(JWT("refreshJwt"));
  app.use(
    swagger({
      path: "/swagger",
    })
  );
  app.onError(({ code, error, set }) => NewError({ code, error, set }));
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
