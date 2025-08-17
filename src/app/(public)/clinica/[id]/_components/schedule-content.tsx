"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import { Prisma } from "@/generated/prisma";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppointmentForm, AppointmentFormData } from "./schedule-form";
import { formatPhone } from "@/utils/formatPhone";
import { DateTimePicker } from "./date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";
import { ScheduleTimeList } from "./schedule-time-list";
import { createNewAppointment } from "../_actions/create-appointments";
import { toast } from "sonner";

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    services: true;
    subscription: true;
  };
}>;

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm();
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

  const { watch } = form;

  const selectedDate = watch("date");
  const selectedServiceId = watch("serviceId");

  async function handleRegisterAppointment(formData: AppointmentFormData) {
    if(!selectedTime) {
      return;
    }

    const response = await createNewAppointment({
      ...formData,
      time: selectedTime,
      clinicId: clinic.id
    }) 

    if(response.error) {
      toast.error(response.error)
      return;
    }

    toast.success("Agendamento realizado com sucesso!");
    form.reset();
    setSelectedTime("");

  }

  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setLoadingSlots(true);

      try {
        const dateString = date.toISOString().split("T")[0];

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`
        );

        const json = await response.json();

        setLoadingSlots(false);
        return json;
      } catch (err) {
        console.log(err);
        setLoadingSlots(false);
        return [];
      }
    },
    [clinic.id]
  );

  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((blocked) => {
        setBlockedTimes(blocked);

        const times = clinic.times || [];

        const finalSlots = times.map((time) => ({
          time,
          available: !blocked.includes(time),
        }));

        setAvailableTimeSlots(finalSlots);
        
        const stillAvailable = finalSlots.filter(
          (slot) => slot.time === selectedTime && slot.available
        );

        if(!stillAvailable.length) {
          setSelectedTime("");
        }

      });
    }
  }, [
    selectedDate,
    selectedServiceId,
    clinic.times,
    fetchBlockedTimes,
    selectedTime,
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-emerald-500" />

      <section className="container mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-6">
              <Image
                src={clinic.image ?? "/foto1.png"}
                alt="Foto da clínica"
                fill
                className="object-cover"
              />
            </div>

            <h1 className="text-2xl font-bold mb-2">{clinic.name}</h1>

            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span>{clinic.addres ?? "Endereço não informado"}</span>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-2xl w-full mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterAppointment)}
            className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel className="font-semibold ">
                    Nome completo
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Digite seu nome completo..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel className="font-semibold ">Email:</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Digite seu nome completo..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel className="font-semibold ">Telefone:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      placeholder="(xx) xxxxx-xxxx"
                      onChange={(e) => {
                        const formattedValue = formatPhone(e.target.value);
                        field.onChange(formattedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="my-3 flex items-center gap-2">
                  <FormLabel className="font-semibold ">
                    Data do agendamento:
                  </FormLabel>
                  <FormControl>
                    <DateTimePicker
                      initialDate={new Date()}
                      className="w-full rounded border p-2"
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date);
                          setSelectedTime("");
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel className="font-semibold">
                    Selecione o servico:
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedTime("");
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Selecione um servico"
                          className="w-full"
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {clinic.services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - {Math.floor(service.duration / 60)}h {service.duration % 60}min
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedServiceId && (
              <div className="space-y-2 ">
                <Label>Horários disponíveis:</Label>

                <div className="bg-gray-100 rounded-lg p-4">
                  {loadingSlots ? (
                    <p>Carregando horários...</p>
                  ) : availableTimeSlots.length === 0 ? (
                    <p className="text-red-500">Nenhum horário disponível</p>
                  ) : (
                    <ScheduleTimeList
                      onSelectTime={(time) => setSelectedTime(time)}
                      clinicTimes={clinic.times}
                      blockedTimes={blockedTimes}
                      availableTimeSlots={availableTimeSlots}
                      selectedTime={selectedTime}
                      selectedDate={selectedDate}
                      requiredSlots={
                        clinic.services.find(
                          (service) => service.id === selectedServiceId
                        )
                          ? Math.ceil(
                              clinic.services.find(
                                (service) => service.id === selectedServiceId
                              )!.duration / 30
                            )
                          : 1
                      }
                    />
                  )}
                </div>
              </div>
            )}

            {clinic.status ? (
              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
                disabled={
                  !watch("name") ||
                  !watch("email") ||
                  !watch("phone") ||
                  !watch("date") ||
                  !watch("serviceId")
                }
              >
                Realizar agendamento
              </Button>
            ) : (
              <p className="bg-red-500 text-white rounded-md text-center px-4 py-2">
                A clínica encontra-se fechada nesse momento.
              </p>
            )}
          </form>
        </Form>
      </section>
    </div>
  );
}
