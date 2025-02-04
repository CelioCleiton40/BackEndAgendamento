import { z } from 'zod';

/**
 * Esquema de validação para registro de usuário.
 */
export const userSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  role: z.enum(['user', 'admin']).optional(),
});

/**
 * Valida os dados de um novo usuário.
 * @param data - Dados do usuário.
 * @returns {IRegisterUser} - Dados validados.
 * @throws {Error} - Se os dados forem inválidos.
 */
export const validateUser = (data: any) => {
  return userSchema.parse(data);
};

/**
 * Esquema de validação para criação de agendamento.
 */
export const scheduleSchema = z.object({
  userId: z.number().int().positive({ message: 'ID do usuário deve ser um número positivo' }),
  date: z.date().optional(), // Opcional, pode ser sugerido pela IA
  description: z.string().min(1, { message: 'A descrição é obrigatória' }),
});

/**
 * Valida os dados de um novo agendamento.
 * @param data - Dados do agendamento.
 * @returns {ICreateSchedule} - Dados validados.
 * @throws {Error} - Se os dados forem inválidos.
 */
export const validateSchedule = (data: any) => {
  return scheduleSchema.parse(data);
};