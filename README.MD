---

# Backend com Node.js, TypeScript, Prisma ORM e IA

## Índice
1. [Descrição](#descrição)
2. [Funcionalidades](#funcionalidades)
3. [Pré-requisitos](#pré-requisitos)
4. [Instalação](#instalação)
5. [Configuração](#configuração)
6. [Uso](#uso)
7. [Rotas da API](#rotas-da-api)
8. [Testes](#testes)
9. [Contribuição](#contribuição)
10. [Licença](#licença)

---

## Descrição

Este é um backend robusto construído com **Node.js**, **TypeScript**, **Prisma ORM** e **Express**, com suporte a funcionalidades avançadas como:
- Registro de usuários e administradores.
- Autenticação JWT.
- Agendamento com inteligência artificial (IA) para sugestão de horários ótimos.
- Documentação da API via Swagger.

O projeto foi projetado para ser escalável, seguro e fácil de manter, com validações robustas, logs centralizados e suporte a middlewares de segurança.

---

## Funcionalidades

- **Autenticação**: Registro e login de usuários com JWT.
- **Agendamento**: Criação de agendamentos com sugestões de horários baseadas em IA.
- **Segurança**: Proteção contra ataques comuns (XSS, CSRF, SQL Injection).
- **Escalabilidade**: Suporte a cache Redis e filas assíncronas (Bull).
- **Documentação**: API documentada usando Swagger.

---

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados no seu sistema:

- **Node.js** (versão 16 ou superior): [https://nodejs.org/](https://nodejs.org/)
- **npm** ou **yarn**: Gerenciador de pacotes do Node.js.
- **PostgreSQL** ou outro banco de dados compatível com Prisma: [https://www.postgresql.org/](https://www.postgresql.org/)
- **Redis** (opcional): Para cache e filas assíncronas.
- **Docker** (opcional): Para containerização.

---

## Instalação

Siga as etapas abaixo para configurar o projeto localmente:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/celiocleiton40/BackEndAgendamento.git
   cd BackEndAgendamento
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o banco de dados**:
   - Configure o `.env` com as variáveis necessárias:
     ```env
     DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
     JWT_SECRET=seu_jwt_secreto
     REDIS_URL=redis://localhost:6379
     NODE_ENV=development
     PORT=3000
     ```

4. **Aplicar migrações do Prisma**:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Inicie o servidor**:
   - Em modo de desenvolvimento:
     ```bash
     npm run dev
     ```
   - Em produção:
     ```bash
     npm run build && npm start
     ```

---

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configuração do banco de dados
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Segredo do JWT
JWT_SECRET=seu_jwt_secreto

# Configuração do Redis (opcional)
REDIS_URL=redis://localhost:6379

# Modo de ambiente
NODE_ENV=development

# Porta do servidor
PORT=3000
```

---

## Uso

### Rotas Principais

#### 1. Autenticação

- **Registro de Usuário**:
  ```http
  POST /auth/register
  Content-Type: application/json

  {
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123",
    "role": "user"
  }
  ```

- **Login de Usuário**:
  ```http
  POST /auth/login
  Content-Type: application/json

  {
    "email": "joao@example.com",
    "password": "senha123"
  }
  ```

#### 2. IA

- **Sugestão de Horário Ótimo**:
  ```http
  POST /ai/suggest-time
  Authorization: Bearer <token>
  Content-Type: application/json

  {
    "userId": 1,
    "description": "Reunião de equipe"
  }
  ```

#### 3. Agendamento

- **Criar Agendamento**:
  ```http
  POST /api/schedule
  Authorization: Bearer <token>
  Content-Type: application/json

  {
    "userId": 1,
    "date": "2023-10-15T14:00:00Z",
    "description": "Reunião importante"
  }
  ```

---

## Rotas da API

A documentação completa da API está disponível no endpoint `/api-docs` após o servidor estar em execução. Acesse através do navegador ou use ferramentas como Postman ou Insomnia.

Exemplo:
```
http://localhost:3000/api-docs
```

---

## Testes

Para executar os testes unitários e de integração, use o comando abaixo:

```bash
npm test
```

Certifique-se de que o banco de dados de teste esteja configurado corretamente no `.env`.

---

## Contribuição

Contribuições são bem-vindas! Siga as etapas abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie as alterações para o repositório remoto (`git push origin feature/nova-funcionalidade`).
5. Abra um pull request detalhando as mudanças.

---

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Autor

- **Célio Cleiton**
- GitHub: [@celiocleiton40](https://github.com/celiocleiton40)
- Email: celiocleiton40@gmail.com

---