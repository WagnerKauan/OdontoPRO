"use client";

import { Button } from "@/components/ui/button";
import { Plan } from "@/generated/prisma";
import { createSubscription } from "../_actions/create_subscription";
import { toast } from "sonner";
import { getStripeJs } from "@/utils/stripe-js";

interface SubscriptionButtonProps {
  type: Plan;
}

export function SubscriptionButton({ type }: SubscriptionButtonProps) {

  async function handleCreateBilling() {
    const { sessionId, error } = await createSubscription({ type });

    if(error) {
      toast.error(error);
      return;
    };
    
    const stripe = await getStripeJs();

    if(stripe) {
      await stripe.redirectToCheckout({ sessionId });
    }
  }

  return (
    <Button
      className={`w-full font-semibold py-3 transition-all duration-300 cursor-pointer
        ${type === "PROFESSIONAL" && "bg-emerald-500 hover:bg-emerald-600"}`}
      onClick={handleCreateBilling}
    >
      Ativar assinatura
    </Button>
  );
}
