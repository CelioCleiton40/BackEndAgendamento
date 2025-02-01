import { Request, Response } from 'express';
import * as scheduleService from '../services/scheduleService';
import { ISchedule } from '../types/scheduleTypes';
import logger from '../config/logger';

export const createSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const scheduleData: ISchedule = req.body;
    const schedule = await scheduleService.createSchedule(scheduleData);
    logger.info(`Agendamento criado: ${schedule.id}`);
    res.status(201).json({ message: 'Agendamento criado com sucesso', schedule });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Erro ao criar agendamento: ${error.message}`);
      res.status(400).json({ error: error.message });
    } else {
      logger.error('Erro desconhecido ao criar agendamento');
      res.status(400).json({ error: 'Erro desconhecido ao criar agendamento' });
    }
  }
};