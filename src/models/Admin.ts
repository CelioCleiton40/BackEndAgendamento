import { User } from './User';

export class Admin extends User {
  /**
   * Construtor específico para administradores.
   */
  constructor(data: Partial<User>) {
    super(data);
    if (this.role !== 'admin') {
      throw new Error('Somente usuários com papel "admin" podem ser instanciados como Admin.');
    }
  }

  /**
   * Verifica se o administrador tem permissão para realizar uma ação específica.
   */
  hasPermission(action: string): boolean {
    // Exemplo de verificação de permissão
    const allowedActions = ['create', 'update', 'delete'];
    return allowedActions.includes(action);
  }
}