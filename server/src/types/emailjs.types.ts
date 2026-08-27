interface EmailTemplateParams {
  userName: string;
  email: string;
  link: string;
}

export interface SendEmailOptions {
  templateId: string;
  templateParams: EmailTemplateParams;
}
