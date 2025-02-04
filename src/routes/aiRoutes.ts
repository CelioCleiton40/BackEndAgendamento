import express from 'express';
import { suggestOptimalTime, advancedAiRequest } from '../controllers/aiController';
import {authenticate} from '../middlewares/authMiddleware';
import rateLimiter from '../middlewares/rateLimiter';

const router = express.Router();

/**
 * Sugere um horário ótimo para agendamento usando IA.
 */
router.post('/suggest-time', authenticate, rateLimiter, suggestOptimalTime);

/**
 * Processa uma solicitação avançada de IA.
 */
router.post('/advanced', authenticate, rateLimiter, advancedAiRequest);

export default router;