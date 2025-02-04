import { Request, Response } from 'express';
import * as authService from '../services/authService';
import logger from '../config/logger';
import { IRegisterUser } from '../types/userTypes';

/**
 * Registra um novo usuário ou administrador.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extrai os dados do corpo da requisição
    const { name, email, password, role }: IRegisterUser = req.body;

    // Chama o serviço de autenticação para registrar o usuário
    const user = await authService.registerUser({ name, email, password, role });

    // Loga o registro no sistema
    logger.info(`Usuário registrado com sucesso: ${user.email}`);

    // Retorna a resposta ao cliente
    res.status(201).json({
      status: 'success',
      message: 'Usuário registrado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Erro ao registrar usuário: ${error.message}`);
      res.status(400).json({
        status: 'error',
        message: error.message,
      });
    } else {
      logger.error('Erro desconhecido ao registrar usuário');
      res.status(400).json({
        status: 'error',
        message: 'Erro desconhecido',
      });
    }
  }
};

/**
 * Autentica um usuário existente.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extrai os dados do corpo da requisição
    const { email, password } = req.body;

    // Chama o serviço de autenticação para realizar o login
    const { user, token } = await authService.loginUser(email, password);

    // Loga o login no sistema
    logger.info(`Login bem-sucedido para o usuário: ${user.email}`);

    // Retorna a resposta ao cliente
    res.status(200).json({
      status: 'success',
      message: 'Login bem-sucedido',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Erro ao autenticar usuário: ${error.message}`);
      res.status(401).json({
        status: 'error',
        message: error.message,
      });
    } else {
      logger.error('Erro desconhecido ao autenticar usuário');
      res.status(401).json({
        status: 'error',
        message: 'Erro desconhecido',
      });
    }
  }
};
