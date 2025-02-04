import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

// Adiciona a interface para estender o tipo Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
      };
    }
  }
}

/**
 * Interface para o payload do token decodificado.
 */
interface DecodedToken {
  userId: number;
  role: string;
}

/**
 * Middleware de autenticação.
 * Verifica se o token JWT é válido e anexa os dados do usuário à requisição.
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Extrai o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Token não fornecido ou inválido');
    }

    // Remove o prefixo "Bearer " para obter o token puro
    const token = authHeader.split(' ')[1];

    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // Anexa os dados do usuário à requisição para uso posterior
    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    // Continua para o próximo middleware ou rota
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      logger.error('Token expirado');
      res.status(401).json({ error: 'Token expirado. Faça login novamente.' });
      return; // Ensure to return after sending a response
    }

    if (error instanceof Error) {
      logger.error(`Erro na autenticação: ${error.message}`);
    } else {
      logger.error('Erro desconhecido na autenticação');
    }
    res.status(401).json({ error: 'Não autorizado' });
    return; // Ensure to return after sending a response
  }
};
