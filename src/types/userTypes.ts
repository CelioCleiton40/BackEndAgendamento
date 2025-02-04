export interface IUser {
    id?: number; // ID do usuário (opcional para criação)
    name: string; // Nome do usuário
    email: string; // E-mail do usuário
    password: string; // Senha do usuário (criptografada)
    role: 'user' | 'admin'; // Papel do usuário (usuário ou administrador)
    createdAt?: Date; // Data de criação (opcional)
    updatedAt?: Date; // Data de atualização (opcional)
  }
  
  // Interface para dados enviados pelo cliente (ex.: registro)
  export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'admin'; // Opcional, padrão é "user"
  }
  
  // Interface para dados retornados ao cliente (ex.: sem a senha)
  export interface ISafeUser {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
  }