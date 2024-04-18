import bearer from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";
import { env } from "../env";

export default function JWT(selection: "jwt" | "refreshJwt") {
  switch (selection) {
    case "jwt":
      return jwt({
        name: "jwt",
        secret: env.JWT_SECRETS,
        exp: "7d",
      });
    case "refreshJwt":
      return jwt({
        name: "refreshJwt",
        secret: env.JWT_SECRETS,
      });
  }
}
