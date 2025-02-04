export interface ISchedule {
    id?: number; // ID do agendamento (opcional para criação)
    userId: number; // ID do usuário associado ao agendamento
    date: Date; // Data e hora do agendamento
    description: string; // Descrição do agendamento
    createdAt?: Date; // Data de criação (opcional)
    updatedAt?: Date; // Data de atualização (opcional)
  }
  
  // Interface para dados enviados pelo cliente (ex.: criação de agendamento)
  export interface ICreateSchedule {
    userId: number;
    date?: Date; // Opcional, pode ser sugerido pela IA
    description: string;
  }