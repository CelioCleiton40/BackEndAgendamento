import { createServer } from 'http';
import app from './app';
import logger from './config/logger';

// Define a porta de escuta (usa a variável de ambiente ou fallback para 3000)
const PORT = process.env.PORT || 3000;

// Cria o servidor HTTP
const server = createServer(app);

// Inicializa o servidor
server.listen(PORT, () => {
  logger.info(`Servidor iniciado na porta ${PORT}`);
  logger.info(`Ambiente: ${process.env.NODE_ENV}`);
});