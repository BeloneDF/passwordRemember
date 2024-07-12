import { Elysia } from "elysia";
import * as Controller from "../controllers/user/user";
import { type User } from "../types/user";

export const NormalUser = (app: Elysia) => {
  app.post("/user", ({ body }: { body: User }) => {
    try {
      return Controller.AddUser(body);
    } catch (error) {
      console.error(error);
    }
  });

  app.get("/verify/user/:id", ({ params }: { params: { id: string } }) => {
    try {
      return Controller.VerifyUser(params.id);
    } catch (error) {
      console.error(error);
    }
  });
};

export const PrivateUser = (app: Elysia) => {
  app.get("/users", () => {
    try {
      return Controller.GetUser();
    } catch (error) {
      console.error(error);
    }
  });
  app.get("/users/:id", ({ params }: { params: { id: string } }) => {
    try {
      return Controller.GetUserById(params.id);
    } catch (error) {
      console.error(error);
    }
  });
  app.delete("/users/:id", ({ params }: { params: { id: string } }) => {
    console.error(params);
    try {
      return Controller.DeleteUser(params.id);
    } catch (error) {
      console.error(error);
    }
  });

  app.put(
    "/users/:id",
    ({ params, body }: { params: { id: string }; body: User }) => {
      try {
        return Controller.PutUser({ id: params.id, body });
      } catch (error) {
        console.error(error);
      }
    }
  );
};
