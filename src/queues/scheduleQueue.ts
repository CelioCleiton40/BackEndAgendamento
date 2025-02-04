import Queue from 'bull';
import { createSchedule } from '../services/scheduleService';

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const scheduleQueue = new Queue('schedule', redisUrl);

scheduleQueue.process(async (job) => {
  const { userId, description } = job.data;
  console.log(`Processando agendamento para o usuário ${userId}: ${description}`);
  await createSchedule(job.data); // Chamando a função correta
});

export default scheduleQueue;
