import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { validateUser } from '../utils/validationUtils';
import logger from '../config/logger';

export const registerUser = async (userData: any) => {
  try {
    const validatedData = validateUser(userData);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      throw new Error('E-mail já registrado');
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role || 'user',
      },
    });

    logger.info(`Usuário registrado: ${user.email}`);
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

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    logger.info(`Login bem-sucedido para: ${user.email}`);
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