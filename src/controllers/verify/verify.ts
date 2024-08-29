import { env } from "../../env";
import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";

export async function VerifyEmail({
  id,
  email,
  username,
}: {
  id: string;
  email: string;
  username: string;
}) {
  const mailersend = new MailerSend({
    apiKey: env.MAILERSEND_API_KEY,
  });

  const recipients = [new Recipient(email, username)];
  const sentFrom = new Sender(env.MILERSEND_SENDER, "Password Remember");

  const personalization = [
    {
      email: email,
      data: {
        verifycation_link: `${env.HOST}/verify/user/${id}`,
        username: username,
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Verify your account - Password Remember")
    .setTemplateId(env.MILERSEND_TEMPLATE_ID)
    .setPersonalization(personalization);

  try {
    await mailersend.email.send(emailParams);
  } catch (error) {
    console.log("Error sending email:", error);
  }
}
