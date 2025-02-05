import nodemailer from "nodemailer";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

// Configuração do Twilio
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Função para enviar e-mail
export async function sendEmailNotification(to: string, subject: string, text: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
}

// Função para enviar SMS
export async function sendSmsNotification(to: string, message: string) {
  await twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });
}
