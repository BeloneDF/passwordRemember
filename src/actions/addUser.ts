import { selectMethod } from "@/api/methods";
import { createUserPropsA } from "@/types/createUser";

export async function addUser(data: createUserPropsA) {
  selectMethod("post", "user", data);
}
