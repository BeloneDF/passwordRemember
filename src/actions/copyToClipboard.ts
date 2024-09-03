import { Passwords } from "@/types/passwords";

interface CopyToClipboardProps {
  password: Passwords;
  type: "password" | "login";
}

export function copyToClipboard({ password, type }: CopyToClipboardProps) {
  const text = type === "password" ? password.password : password.login;
  navigator.clipboard.writeText(text);
}

export function copyToClipboardNewPassword(password: string) {
  navigator.clipboard.writeText(password);
}
