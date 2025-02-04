import dotenv from 'dotenv'; // Importa o dotenv para carregar variáveis de ambiente
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import aiRoutes from './routes/aiRoutes';
import scheduleRoutes from './routes/scheduleRoutes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { setupSwagger } from './config/swagger';
import logger from './config/logger';

// Carrega as variáveis do arquivo.env (apenas em ambiente de desenvolvimento)
dotenv.config();  // Carrega as variáveis do arquivo .env
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurações de segurança
app.use(helmet());
app.use(cors()); // Habilita CORS (pode ser configurado com opções específicas)

// Logs de requisições (apenas em ambiente de desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rotas da aplicação
app.use('/auth', authRoutes); // Rotas de autenticação
app.use('/ai', aiRoutes);     // Rotas de IA
app.use('/api', scheduleRoutes); // Rotas de agendamento

// Configura Swagger (apenas em ambiente de desenvolvimento)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(setupSwagger));

// Middleware global de tratamento de erros
app.use(errorHandler);

// Rota padrão (opcional)
app.get('/', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

// Exporta a instância da aplicação
export default app;
