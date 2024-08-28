import { Resend } from "resend";
import { env } from "../../env";
import emailjs from "@emailjs/browser";

export async function VerifyEmail({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  // const resend = new Resend(env.EMAIL_API_KEY);
  // console.log(email);
  // resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: "belonefraga1@hotmail.com",
  //   subject: "Verify your email",
  //   text: `Clique aqui para verificar seu cadastro: https://passwordremember-production.up.railway.app/verify/user/${id}`,
  // });

  const templateParams = {
    to_email: email,
    verify_link: `https://passwordremember-production.up.railway.app/verify/user/${id}`,
  };
  try {
    emailjs.send(
      env.EMAILJS_SERVICE_ID,
      env.EMAILJS_TEMPLATE_ID,
      templateParams,
      env.EMAILJS_PUBLICS_API_KEY
    );
  } catch (error) {
    console.log(error);
  }
}
