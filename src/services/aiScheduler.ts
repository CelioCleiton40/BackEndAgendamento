// src/services/aiScheduler.ts
import  prisma  from "../config/db";

// Função que busca horários disponíveis e sugere um agendamento
export async function suggestAppointment(userId: string, duration: number) {
  // 1. Buscar os horários já agendados para o usuário
  const appointments = await prisma.appointment.findMany({
    where: { userId },
    orderBy: { startTime: "asc" },
  });

  // 2. Definir faixa de horários disponíveis (exemplo: 08:00 - 18:00)
  const startTime = new Date();
  startTime.setHours(8, 0, 0, 0);
  const endTime = new Date();
  endTime.setHours(18, 0, 0, 0);

  let availableTime = startTime;

  // 3. Percorrer os agendamentos existentes e encontrar um espaço livre
  for (const appointment of appointments) {
    const appointmentStart = new Date(appointment.startTime);
    const appointmentEnd = new Date(appointment.endTime);

    // Se houver espaço antes do próximo compromisso
    if (availableTime.getTime() + duration * 60000 <= appointmentStart.getTime()) {
      return availableTime; // Retorna o primeiro horário disponível
    }

    // Atualiza o horário disponível para depois do compromisso
    availableTime = new Date(appointmentEnd.getTime() + 10 * 60000); // 10 min de intervalo
  }

  // Se não encontrou, verifica se pode encaixar no final do expediente
  if (availableTime.getTime() + duration * 60000 <= endTime.getTime()) {
    return availableTime;
  }

  return null; // Sem horários disponíveis
}
