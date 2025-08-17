import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import { Calendar } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ButtonCopyLink } from "./_components/button-copy-link";
import { Reminders } from "./_components/reminder/reminders";
import { Appointments } from "./_components/appointments/appointments";
import { checkSubscription } from "@/utils/permissions/checkSubscription";
import { LabelSubscription } from "@/components/ui/label-subscription";
import { LabelSubscriptionTrial } from "@/components/ui/label-subscription-trial";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const subscription = await checkSubscription(session.user?.id!);

  return (
    <main>
      <div className="space-x-2 flex items-center justify-end">
        <Link href={`/clinica/${session.user?.id}`} target="_blank">
          <Button className="bg-emerald-500 hover:bg-emerald-600 flex-1 md:flex-[0] cursor-pointer">
            <Calendar className="h-5 w-5" />
            <span>Novo agendamento</span>
          </Button>
        </Link>

        <ButtonCopyLink userId={session.user?.id!} />
      </div>

      {subscription?.subscriptionStatus === "EXPIRED" && (
        <LabelSubscription expired={true} />
      )}

      {subscription?.subscriptionStatus === "TRIAL" && (
        <LabelSubscriptionTrial daysRemaining={subscription?.daysRemaining}  />
      )}

      {subscription?.subscriptionStatus !== "EXPIRED" && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <Appointments userId={session.user?.id!} />
          <Reminders userId={session.user?.id!} />
        </section>
      )}
    </main>
  );
}
