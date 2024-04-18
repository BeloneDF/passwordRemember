import { Elysia } from "elysia";
import { env } from "./env";
import connectToDatabase from "./db/connection";
import { cors } from "@elysiajs/cors";
import { Routes } from "./routes";

function runServer() {
  const app = new Elysia();
  app.use(cors());
  app.use(Routes());
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
