import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, X } from "lucide-react";

interface DialogCancelConfirmProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  cancelAppointment: () => void;
}

export function DialogCancelConfirm({
  setIsOpen,
  isOpen,
  cancelAppointment,

}: DialogCancelConfirmProps) {


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <X className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center text-center gap-2">
          <AlertTriangle className="w-10 h-10 text-destructive" />
          <DialogTitle className="text-lg font-semibold">
            Cancelar agendamento
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tem certeza que deseja cancelar este agendamento? Esta ação não
            poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Manter agendamento
          </Button>
          <Button
            className="cursor-pointer"
            variant="destructive"
            onClick={cancelAppointment}
          >
            Confirmar cancelamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
