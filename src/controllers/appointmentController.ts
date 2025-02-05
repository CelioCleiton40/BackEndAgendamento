// src/controllers/appointmentController.ts
import { Request, Response } from "express";
import { suggestAppointment } from "../services/aiScheduler";

export const getSuggestedAppointment = async (req: Request, res: Response) => {
  const { userId, duration } = req.body;

  if (!userId || !duration) {
    return res.status(400).json({ message: "Usuário e duração são obrigatórios!" });
  }

  const suggestedTime = await suggestAppointment(userId, Number(duration));

  if (!suggestedTime) {
    return res.status(404).json({ message: "Nenhum horário disponível." });
  }

  return res.json({ suggestedTime });
};
