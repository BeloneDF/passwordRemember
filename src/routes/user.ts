import { Elysia } from "elysia";
import * as Controller from "../controllers/user/user";
import { type User } from "../types/user";

export const UserRoutes = (app: Elysia) => {
  app.post("/user", ({ body }: { body: User }) => {
    try {
      return Controller.AddUser(body);
    } catch (error) {
      console.error(error);
    }
  });
  app.post("/login", ({ body }: { body: User }) => {
    try {
      return Controller.Login(body);
    } catch (error) {
      console.error(error);
    }
  });
  app.get("/users", () => {
    try {
      return Controller.GetUser();
    } catch (error) {
      console.log(error);
    }
  });
  app.delete("/users/:id", ({ params }: { params: { id: string } }) => {
    console.log(params);
    try {
      return Controller.DeleteUser(params.id);
    } catch (error) {
      console.log(error);
    }
  });

  app.put(
    "/users/:id",
    ({ params, body }: { params: { id: string }; body: User }) => {
      console.log("route: ", body);
      try {
        return Controller.PutUser({ id: params.id, body });
      } catch (error) {
        console.log(error);
      }
    }
  );
};
