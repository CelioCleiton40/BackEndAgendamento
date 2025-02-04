import winston from 'winston';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Configuração do logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',  // Usa 'debug' como nível padrão se não estiver especificado no .env
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Registra erros no arquivo error.log
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',  // Apenas logs de erro
    }),
    // Registra todos os logs no arquivo combined.log
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info',  // Registra logs de nível 'info' e superior
    }),
  ],
});

// Adiciona o transporte para o console apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Coloriza os logs para facilitar a leitura
        winston.format.simple()    // Exibe apenas a mensagem simples
      ),
    })
  );
}

// Função auxiliar para garantir que a aplicação saiba onde os logs estão sendo gravados
const logEnvironmentInfo = () => {
  if (process.env.NODE_ENV) {
    logger.info(`Aplicação em modo ${process.env.NODE_ENV}`);
  } else {
    logger.warn('Modo de ambiente não especificado em NODE_ENV!');
  }
};

logEnvironmentInfo();  // Chama a função para logar o ambiente da aplicação

export default logger;
