import { selectMethod } from "@/api/methods";
import { toBase64, resizeImage } from "@/actions/toBase64";
import { AddPasswords } from "@/types/passwords";
import { Data } from "@/api/methods";

export async function addPassword(data: AddPasswords) {
  const { image, image_verification_software, name } = data;

  const imageFile = image && image[0] instanceof File ? image[0] : undefined;
  const imageVerificationSoftwareFile =
    image_verification_software &&
    image_verification_software[0] instanceof File
      ? image_verification_software[0]
      : undefined;

  const resizedImage = imageFile
    ? await resizeImage(imageFile, 800, 800, 0.1)
    : undefined;
  const resizedImageVerificationSoftware = imageVerificationSoftwareFile
    ? await resizeImage(imageVerificationSoftwareFile, 800, 800, 0.1)
    : undefined;

  const imageBase64: string | undefined | unknown = resizedImage
    ? await toBase64(resizedImage)
    : undefined;
  const imageVerificationSoftwareBase64: string | undefined | unknown =
    resizedImageVerificationSoftware
      ? await toBase64(resizedImageVerificationSoftware)
      : undefined;

  const newData: Data = {
    ...data,
    name: name.toLowerCase(),
    image: imageBase64,
    image_verification_software: imageVerificationSoftwareBase64,
  };

  selectMethod("post", "password", newData);
}
