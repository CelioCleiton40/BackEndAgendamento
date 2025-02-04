import express from 'express';
import { createSchedule } from '../controllers/scheduleController';
import { authenticate } from '../middlewares/authMiddleware';
import rateLimiter from '../middlewares/rateLimiter';

const router = express.Router();

/**
 * Cria um novo agendamento.
 */
router.post('/schedule', authenticate, rateLimiter, createSchedule);

export default router;