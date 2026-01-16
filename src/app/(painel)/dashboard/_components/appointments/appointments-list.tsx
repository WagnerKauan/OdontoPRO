"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
  import { format } from "date-fns";
import { Prisma } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, X } from "lucide-react";
import { cancelAppointment } from "../../_actions/cancel-appointment";
import { toast } from "sonner";
import { DialogAppointment } from "./dialog-appointment";
import { DialogCancelConfirm } from "./dialog-cancel-confirm";
import { ButtonPickerAppointment } from "./button-date";

interface AppointmentsListProps {
  times: string[];
}

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
  include: {
    service: true;
  };
}>;

export function AppointmentsList({ times }: AppointmentsListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogCancelOpen, setIsDialogCancelOpen] = useState(false);
  const [detailAppointment, setDetailAppointment] =
    useState<AppointmentWithService | null>(null);


  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-appointments", date],
    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), "yyyy-MM-dd");
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`;
      const response = await fetch(url);
      const json = (await response.json()) as AppointmentWithService[];

      if (!response.ok) {
        return [];
      }

      return json;
    },
    staleTime: 20000,
    refetchInterval: 60000,
  });

  const occupantMap: Record<string, AppointmentWithService> = {};

  if (data && data.length > 0) {
    for (const appointment of data) {
      const requiredSlots = Math.ceil(appointment.service.duration / 30);
      const startIndex = times.indexOf(appointment.time);

      for (let i = 0; i < requiredSlots; i++) {
        const slotIndex = startIndex + i;

        if (slotIndex < times.length) {
          occupantMap[times[slotIndex]] = appointment;
        }
      }
    }
  }

  async function handleCancelAppointment(appointmentId: string) {
    const response = await cancelAppointment({ appointmentId });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    router.refresh();
    queryClient.invalidateQueries({ queryKey: ["get-appointments"] });
    await refetch();
    setIsDialogCancelOpen(false);
    toast.success(response.data);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Agendamentos
          </CardTitle>
          
          <ButtonPickerAppointment />
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 py-3">
                    <Skeleton className="h-5 w-16 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32 rounded" />
                      <Skeleton className="h-3 w-20 rounded" />
                    </div>
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              times.map((slot) => {
                const occupant = occupantMap[slot];
                return (
                  <div
                    key={slot}
                    className="flex items-center py-3 border-t last:border-b border-border"
                  >
                    <div className="w-16 text-sm font-semibold">{slot}</div>

                    {occupant ? (
                      <>
                        <div className="flex-1 text-sm">
                          <div className="font-semibold">{occupant.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {occupant.service.name}
                          </div>
                        </div>
                        <div className="ml-auto flex gap-2">
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cursor-pointer"
                              onClick={() => setDetailAppointment(occupant)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>

                          <DialogCancelConfirm
                            cancelAppointment={() =>
                              handleCancelAppointment(occupant.id)
                            }
                            setIsOpen={setIsDialogCancelOpen}
                            isOpen={isDialogCancelOpen}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 text-sm text-muted-foreground flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                        Disponível
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <DialogAppointment appointment={detailAppointment} />
    </Dialog>
  );
}
