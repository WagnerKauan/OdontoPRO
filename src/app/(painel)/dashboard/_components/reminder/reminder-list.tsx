"use client";

import { Reminder } from "@/generated/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteReminder } from "../../_actions/delete-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ReminderContent } from "./reminder-content";
import { useState } from "react";

interface ReminderListProps {
  reminder: Reminder[];
}

export function ReminderList({ reminder }: ReminderListProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleDeleteReminder(reminderId: string) {
    const response = await deleteReminder({ reminderId });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Lembretes
          </CardTitle>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-9 h-9 p-0 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
                variant="ghost"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Novo lembrete</DialogTitle>
                <DialogDescription>
                  Criar um novo lembrete para sua lista.
                </DialogDescription>
              </DialogHeader>
              <ReminderContent setIsDialogOpen={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {reminder.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              Nenhum lembrete registrado...
            </p>
          ) : (
            <ScrollArea className="h-[340px] lg:max-h-[calc(100vh-15rem)] pr-0 flex-1">
              {reminder.map((item) => (
                <article
                  key={item.id}
                  className="flex items-center justify-between py-2 px-3 mb-2 bg-yellow-50 border 
                  border-yellow-200 rounded-md hover:bg-yellow-100 transition-colors"
                >
                  <p className="text-sm lg:text-base text-gray-800 break-words">
                    {item.description}
                  </p>
                  <Button
                    onClick={() => handleDeleteReminder(item.id)}
                    className="bg-red-500 hover:bg-red-600 shadow-none w-8 h-8 p-0 
                    rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <Trash className="h-4 w-4 text-white" />
                  </Button>
                </article>
              ))}
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
