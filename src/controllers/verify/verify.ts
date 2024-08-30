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

  const recipient = new Recipient(email, username);
  const sender = new Sender(env.MAILERSEND_SENDER, "Password Remember");

  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo([recipient])
    .setReplyTo(sender)
    .setSubject("Verify your account - Password Remember")
    .setTemplateId(env.MAILERSEND_TEMPLATE_ID)
    .setPersonalization([
      {
        email,
        data: {
          verification_link: `${env.HOST}/verify/user/${id}`,
          username,
        },
      },
    ]);

  try {
    await mailersend.email.send(emailParams);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
