export class Schedule {
    id: number;
    userId: number;
    date: Date;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(data: Partial<Schedule>) {
      this.id = data.id || 0;
      this.userId = data.userId || 0;
      this.date = data.date || new Date();
      this.description = data.description || '';
      this.createdAt = data.createdAt || new Date();
      this.updatedAt = data.updatedAt || new Date();
    }
  
    /**
     * Verifica se o agendamento ocorre em um horário válido.
     */
    isValidTime(): boolean {
      const now = new Date();
      return this.date > now; // O agendamento deve ser no futuro
    }
  
    /**
     * Atualiza os dados do agendamento.
     */
    update(data: Partial<Schedule>): void {
      if (data.userId) this.userId = data.userId;
      if (data.date) this.date = data.date;
      if (data.description) this.description = data.description;
      this.updatedAt = new Date();
    }
  }