import express from 'express';
import { register, login } from '../controllers/authController';
import rateLimiter from '../middlewares/rateLimiter';

const router = express.Router();

/**
 * Registro de novos usuários.
 */
router.post('/register', rateLimiter, register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login de usuário
 *     description: Faz login e retorna um token JWT
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@email.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', rateLimiter, login);

export default router;