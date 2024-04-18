import { Elysia } from "elysia";
import { UserRoutes } from "./user";

export const Routes = () => {
  const app = new Elysia();
  UserRoutes(app);
  return app;
};
