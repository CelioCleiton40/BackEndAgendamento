import Queue from 'bull';
import { processSchedule } from '../services/scheduleService';

const scheduleQueue = new Queue('schedule', process.env.REDIS_URL!);

scheduleQueue.process(async (job) => {
  const { userId, description } = job.data;
  console.log(`Processando agendamento para o usuário ${userId}: ${description}`);
  await processSchedule(job.data);
});

export default scheduleQueue;