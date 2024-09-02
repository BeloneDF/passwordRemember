import { selectMethod } from "@/api/methods";
import { createUserProps } from "@/app/page";

export async function addUser(data: createUserProps) {
  console.log(data);
  selectMethod("post", "user", data);
}
