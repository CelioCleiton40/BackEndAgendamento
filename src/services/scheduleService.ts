import prisma from '../config/db';
import { suggestOptimalSchedule } from '../services/aiService';
import logger from '../config/logger';

/**
 * Cria um novo agendamento no banco de dados.
 */
export const createSchedule = async (scheduleData: any) => {
  try {
    // Usa a IA para sugerir um horário ótimo, caso nenhum seja fornecido
    const optimalDate = scheduleData.date || (await suggestOptimalSchedule(scheduleData.userId, ''));

    // Cria o agendamento no banco de dados
    const schedule = await prisma.schedule.create({
      data: {
        userId: scheduleData.userId,
        date: new Date(optimalDate),
        description: scheduleData.description,
      },
    });

    return schedule;
  } catch (error) {
    if (error instanceof Error) {
        logger.error(`Erro ao autenticar usuário: ${error.message}`);
      } else {
        logger.error('Erro desconhecido ao autenticar usuário');
      }
    throw error;
  }
};