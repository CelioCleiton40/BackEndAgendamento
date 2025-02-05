import { google } from "googleapis";
import { sendEmailNotification, sendSmsNotification } from "./notificationService";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Função para gerar URL de autenticação do Google
export function getAuthUrl() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
  });
  return authUrl;
}

// Função para configurar o token do usuário
export async function setAuthToken(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

// Função para criar um evento no Google Calendar
export async function createGoogleCalendarEvent(
  userToken: any,
  summary: string,
  description: string,
  startTime: Date,
  endTime: Date,
  userEmail: string,
  userPhone: string
) {
  oauth2Client.setCredentials(userToken);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const event = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary,
      description,
      start: { dateTime: startTime.toISOString(), timeZone: "America/Sao_Paulo" },
      end: { dateTime: endTime.toISOString(), timeZone: "America/Sao_Paulo" },
    },
  });

  const message = `Seu evento "${summary}" foi agendado para ${startTime.toLocaleString()}.`;

  await sendEmailNotification(userEmail, "Novo Agendamento", message);
  await sendSmsNotification(userPhone, message);

  return event.data;
}

export async function rescheduleGoogleCalendarEvent(
  userToken: any,
  eventId: string,
  newStartTime: Date,
  newEndTime: Date
) {
  oauth2Client.setCredentials(userToken);

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const updatedEvent = {
    start: { dateTime: newStartTime.toISOString(), timeZone: "America/Sao_Paulo" },
    end: { dateTime: newEndTime.toISOString(), timeZone: "America/Sao_Paulo" },
  };

  const response = await calendar.events.patch({
    calendarId: "primary",
    eventId,
    requestBody: updatedEvent,
  });

  return response.data;
}


export async function deleteGoogleCalendarEvent(userToken: any, eventId: string) {
  oauth2Client.setCredentials(userToken);

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  await calendar.events.delete({
    calendarId: "primary",
    eventId,
  });

  return { message: "Evento cancelado com sucesso!" };
}