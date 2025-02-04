import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

/**
 * Middleware global de tratamento de erros.
 * Captura todos os erros lançados durante o processamento das rotas.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Loga o erro no sistema
    logger.error(`Erro na requisição ${req.method} ${req.url}: ${err.message}`);

    // Verifica se o erro tem uma mensagem específica (ex.: validação)
    let statusCode = 500; // Código padrão para erros internos
    let message = 'Erro interno do servidor';

    if (err instanceof Error) {
      statusCode = err.message.includes('validation') ? 400 : statusCode;
      message = err.message || message;
    }

    // Retorna a resposta ao cliente
    res.status(statusCode).json({
      error: message,
    });
} catch (error) {
    if (error instanceof Error) {
      logger.error(`Erro na autenticação: ${error.message}`);
    } else {
      logger.error('Erro desconhecido na autenticação');
    }
    res.status(500).json({
        error: 'Erro interno do servidor',
      });
  }
};