import { Request, Response } from 'express';
import * as aiService from '../services/aiService';
import logger from '../config/logger';

/**
 * Sugere um horário ótimo para agendamento usando IA.
 */
export const suggestOptimalTime = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extrai os dados da requisição (opcionalmente, pode ser usado para personalizar a sugestão)
    const { userId, description } = req.body;

    // Chama o serviço de IA para sugerir o horário
    const optimalTime = await aiService.suggestOptimalSchedule(userId, description);

    // Loga a sugestão no sistema
    logger.info(`Sugestão de horário ótimo gerada para o usuário ${userId}: ${optimalTime}`);

    // Retorna a sugestão ao cliente
    res.status(200).json({
      message: 'Horário ótimo sugerido com sucesso',
      optimalTime,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Erro ao sugerir horário ótimo: ${error.message}`);
      res.status(400).json({ error: error.message });
    } else {
      logger.error('Erro desconhecido ao sugerir horário ótimo');
      res.status(400).json({ error: 'Erro desconhecido' });
    }
  }
};

/**
 * Processa uma solicitação de IA avançada (ex.: previsão de comportamento).
 */
export const advancedAiRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { input } = req.body;

    // Valida se o input foi fornecido
    if (!input) {
      throw new Error('Entrada inválida');
    }

    // Chama o serviço de IA para processar a solicitação
    const result = await aiService.processAdvancedAiRequest(input);

    // Loga o resultado no sistema
    logger.info(`Resultado da solicitação de IA avançada: ${JSON.stringify(result)}`);

    // Retorna o resultado ao cliente
    res.status(200).json({
      message: 'Solicitação de IA avançada processada com sucesso',
      result,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Erro ao processar solicitação de IA avançada: ${error.message}`);
      res.status(400).json({ error: error.message });
    } else {
      logger.error('Erro desconhecido ao processar solicitação de IA avançada');
      res.status(400).json({ error: 'Erro desconhecido' });
    }
  }
};