import { selectMethod } from "@/api/methods";
import { toBase64 } from "@/actions/toBase64";
import { AddPasswords } from "@/types/passwords";

export async function addPassword(data: AddPasswords) {
  const { image, image_verification_software, name } = data;

  const imageBase64 =
    image && image[0] instanceof File ? await toBase64(image[0]) : undefined;

  const imageVerificationSoftwareBase64 =
    image_verification_software &&
    image_verification_software[0] instanceof File
      ? await toBase64(image_verification_software[0])
      : undefined;

  const newData = {
    ...data,
    name: name.toLowerCase(),
    image: imageBase64,
    image_verification_software: imageVerificationSoftwareBase64,
  };
  selectMethod("post", "password", newData);
}
