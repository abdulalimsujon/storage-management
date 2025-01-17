import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 465,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'alimsujon12@gmail.com',
      pass: 'qpwc slgl opno ldls',
    },
  });

  await transporter.sendMail({
    from: 'mezbaul@programming-hero.com',
    to,
    subject: 'Reset your password within ten mins!',
    text: '',
    html,
  });
};
