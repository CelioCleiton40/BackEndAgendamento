import { Request, Response } from "express";
import { rescheduleGoogleCalendarEvent } from "../services/googleCalendarService";

export const rescheduleCalendarEvent = async (req: Request, res: Response) => {
  const { tokens, eventId, newStartTime, newEndTime } = req.body;

  if (!tokens || !eventId || !newStartTime || !newEndTime) {
    return res.status(400).json({ message: "Parâmetros ausentes!" });
  }

  try {
    const response = await rescheduleGoogleCalendarEvent(
      tokens,
      eventId,
      new Date(newStartTime),
      new Date(newEndTime)
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Erro ao remarcar evento!", error });
  }
};
