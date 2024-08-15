import { destroyCookie } from "nookies";

export function logOut() {
  destroyCookie(null, "access_token");
  setTimeout(() => {
    window.location.reload();
  }, 300);
}
