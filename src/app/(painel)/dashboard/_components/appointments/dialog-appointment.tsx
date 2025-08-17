import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AppointmentWithService } from "./appointments-list";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/formatCurrency";

interface DialogAppointmentProps {
  appointment: AppointmentWithService | null;
}

export function DialogAppointment({ appointment }: DialogAppointmentProps) {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">
          Detalhes do agendamento
        </DialogTitle>
        <DialogDescription>
          Confira as informações do cliente e do serviço agendado.
        </DialogDescription>
      </DialogHeader>

      {appointment && (
        <div className="space-y-4 mt-4">
          {/* Dados do agendamento */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-sm text-gray-500 mb-2">
              Informações do agendamento
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <span className="font-medium">Data:</span>{" "}
                {new Intl.DateTimeFormat("pt-BR", {
                  timeZone: "UTC",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(appointment.appointmentDate))}
              </li>
              <li>
                <span className="font-medium">Horário:</span> {appointment.time}
              </li>
              <li>
                <span className="font-medium">Nome:</span> {appointment.name}
              </li>
              <li>
                <span className="font-medium">Telefone:</span>{" "}
                {appointment.phone}
              </li>
              <li>
                <span className="font-medium">Email:</span> {appointment.email}
              </li>
            </ul>
          </div>

          {/* Detalhes do serviço */}
          <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-sm text-gray-500 mb-2">
              Detalhes do serviço
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <span className="font-medium">Serviço:</span>{" "}
                {appointment.service.name}
              </li>
              <li>
                <span className="font-medium">Valor:</span>{" "}
                {formatCurrency(appointment.service.price / 100)}
              </li>
              <li>
                <span className="font-medium">Duração:</span>{" "}
                {Math.floor(appointment.service.duration / 60)}h{" "}
                {appointment.service.duration % 60}min
              </li>
            </ul>
          </div>
        </div>
      )}
    </DialogContent>
  );
}
