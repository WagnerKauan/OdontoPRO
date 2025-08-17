"use client";

import { Button } from "@/components/ui/button";
import { ReminderFormData, useReminderForm } from "./reminder-form";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createReminder } from "../../_actions/create-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReminderContentProps {
  setIsDialogOpen: () => void;
}

export function ReminderContent( { setIsDialogOpen }: ReminderContentProps ) {
  const router = useRouter();
  const form = useReminderForm();

  async function onSubmit(formData: ReminderFormData) {
    const response = await createReminder(formData);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
    handleResetForm();
    router.refresh();
  }

  function handleResetForm() {
    form.reset();
    setIsDialogOpen();
  }

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Descrição do lembrete
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Digite a descrição do lembrete..."
                    className="max-h-52"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={!form.watch("description")}
          >
            Cadastrar lembrete
          </Button>
        </form>
      </Form>
    </div>
  );
}
