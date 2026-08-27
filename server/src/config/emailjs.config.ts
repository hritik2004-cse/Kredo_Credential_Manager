import type { SendEmailOptions } from "../types/emailjs.types.js";
import { env } from "./env.config.js";

const sendEmail = async ({templateId, templateParams}:SendEmailOptions) => {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: env.emailjsServiceId,
      template_id: templateId,
      user_id: env.emailjsPublicKey,
      accessToken: env.emailjsPrivateKey,
      template_params: templateParams,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`error: ${errorText}`);
  }

  return response;
};

export default sendEmail;