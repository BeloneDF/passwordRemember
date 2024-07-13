import { Resend } from "resend";
import { env } from "../../env";

export async function VerifyEmail({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  const resend = new Resend(env.EMAIL_API_KEY);
  console.log(email);
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "belonefraga1@hotmail.com",
    subject: "Verify your email",
    text: `Clique aqui para verificar seu cadastro: https://passwordremember-production.up.railway.app/verify/user/${id}`,
  });
}
