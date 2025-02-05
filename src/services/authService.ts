import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { validateUser } from '../utils/validationUtils';
import logger from '../config/logger';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

/**
 * Registra um novo usuário no banco de dados.
 */
export const registerUser = async (userData: any) => {
  try {
    // Valida os dados recebidos
    const validatedData = validateUser(userData);

    // Verifica se o e-mail já está cadastrado
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      throw new Error('E-mail já registrado');
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Cria o usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role || 'user', // Padrão é "user"
      },
    });

    return user;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Erro ao registrar usuário: ${error.message}`);
    } else {
      logger.error('Erro desconhecido ao registrar usuário');
    }
    throw error;
  }
};

/**
 * Autentica um usuário existente e gera um token JWT.
 */
export const loginUser = async (email: string, password: string) => {
  try {
    // Busca o usuário pelo e-mail
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    // Gera um token JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '5h' }
    );

    return { user, token };
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Erro ao autenticar usuário: ${error.message}`);
    } else {
      logger.error('Erro desconhecido ao autenticar usuário');
    }
    throw error;
  }
};