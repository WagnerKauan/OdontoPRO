"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  description: z
    .string()
    .min(1, { message: "A descrição do lembrete é obrigatório" }),
});

type FormSchema = z.infer<typeof formSchema>;

export async function createReminder(formData: FormSchema) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Falha ao criar lembrete",
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    await prisma.reminder.create({
      data: {
        description: formData.description,
        userId: session?.user?.id,
      },
    });


    revalidatePath("/dashboard");

    return {
      data: "Lembrete criado com sucesso.",
    }

  } catch (err) {
    return {
      error: "Falha ao criar lembrete",
    };
  }
}
