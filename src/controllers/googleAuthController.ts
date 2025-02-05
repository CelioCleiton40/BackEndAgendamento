import { Request, Response } from "express";
import { getAuthUrl, setAuthToken, createGoogleCalendarEvent } from "../services/googleCalendarService";

export const getGoogleAuthUrl = (req: Request, res: Response) => {
  const url = getAuthUrl();
  res.json({ authUrl: url });
};

export const authenticateGoogleUser = async (req: Request, res: Response) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ message: "Código de autenticação ausente!" });
  }

  try {
    const tokens = await setAuthToken(code as string);
    res.json({ message: "Autenticação bem-sucedida!", tokens });
  } catch (error) {
    res.status(500).json({ message: "Erro ao autenticar!", error });
  }
};

export const createCalendarEvent = async (req: Request, res: Response) => {
  const { tokens, summary, description, startTime, endTime } = req.body;

  if (!tokens || !summary || !startTime || !endTime) {
    return res.status(400).json({ message: "Parâmetros ausentes!" });
  }

  try {
    const event = await createGoogleCalendarEvent(tokens, summary, description, new Date(startTime), new Date(endTime));
    res.json({ message: "Evento criado com sucesso!", event });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar evento!", error });
  }
};
