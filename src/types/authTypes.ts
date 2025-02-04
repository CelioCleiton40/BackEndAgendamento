// Interface para dados do token JWT
import { ISafeUser } from "./userTypes";
export interface IJwtPayload {
    userId: number; // ID do usuário
    role: 'user' | 'admin'; // Papel do usuário
  }
  
  // Interface para resposta de login
  export interface ILoginResponse {
    user: ISafeUser; // Dados seguros do usuário
    token: string; // Token JWT
  } 