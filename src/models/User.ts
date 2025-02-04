export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
  
    constructor(data: Partial<User>) {
      this.id = data.id || 0;
      this.name = data.name || '';
      this.email = data.email || '';
      this.password = data.password || '';
      this.role = data.role || 'user';
      this.createdAt = data.createdAt || new Date();
      this.updatedAt = data.updatedAt || new Date();
    }
  
    /**
     * Valida se o usuário tem permissão de administrador.
     */
    isAdmin(): boolean {
      return this.role === 'admin';
    }
  
    /**
     * Atualiza os dados do usuário.
     */
    update(data: Partial<User>): void {
      if (data.name) this.name = data.name;
      if (data.email) this.email = data.email;
      if (data.password) this.password = data.password;
      if (data.role) this.role = data.role;
      this.updatedAt = new Date();
    }
  }