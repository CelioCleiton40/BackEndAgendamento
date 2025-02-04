import moment from 'moment';

/**
 * Sugerir um horário ótimo com base no momento atual.
 * @returns {Date} - O próximo horário sugerido.
 */
export const suggestOptimalTime = (): Date => {
  const now = moment();
  const nextHour = now.add(1, 'hour').startOf('hour'); // Próxima hora cheia
  return nextHour.toDate();
};

/**
 * Verificar se um horário está disponível (exemplo simulado).
 * @param date - Data e hora a serem verificadas.
 * @returns {boolean} - True se o horário estiver disponível, false caso contrário.
 */
export const isTimeAvailable = (date: Date): boolean => {
  const now = moment();
  const targetTime = moment(date);

  // Simulação: Horários disponíveis devem ser no futuro e em horários comerciais
  if (targetTime.isBefore(now)) return false;
  if (targetTime.hour() < 9 || targetTime.hour() >= 18) return false;

  return true;
};