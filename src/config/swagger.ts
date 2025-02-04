import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'Documentação da API com Swagger',
      contact: {
        name: 'Suporte',
        email: 'suporte@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', // Atualize com o URL correto do seu servidor
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Verifique se o caminho está correto
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
