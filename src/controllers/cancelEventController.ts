import { Request, Response } from "express";
import { deleteGoogleCalendarEvent } from "../services/googleCalendarService";

export const cancelCalendarEvent = async (req: Request, res: Response) => {
  const { tokens, eventId } = req.body;

  if (!tokens || !eventId) {
    return res.status(400).json({ message: "Parâmetros ausentes!" });
  }

  try {
    const response = await deleteGoogleCalendarEvent(tokens, eventId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Erro ao cancelar evento!", error });
  }
};
