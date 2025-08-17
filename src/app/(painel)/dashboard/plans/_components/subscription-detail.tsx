"use client";

import { Subscription } from "@/generated/prisma";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { subscriptionPlans } from "@/utils/plans";
import { Button } from "@/components/ui/button";
import { createPortalCustomer } from "../_actions/create-portal-customer";

interface SubscriptionDetailProps {
  subscription: Subscription;
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {
  const subscriptionInfo = subscriptionPlans.find(
    (plan) => plan.id === subscription.plan
  );

  async function handleManageSubscription() {
    const portal = await createPortalCustomer();

    if(portal.error) {
      toast.error(portal.error);
      return;
    }

    window.location.href = portal.sessionId;
  }

  return (
    <Card className="w-full mx-auto border border-gray-200 shadow-sm rounded-2xl overflow-hidden py-0">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6">
        <CardTitle className="text-2xl font-bold">Seu Plano Ativo</CardTitle>
        <CardDescription className="text-emerald-100">
          Aproveite todos os recursos do seu plano
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl tracking-wide">
            {subscription.plan === "BASIC" ? "BASIC" : "PROFISSIONAL"}
          </h3>

          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              subscription.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {subscription.status === "active" ? "ATIVO" : "INATIVO"}
          </span>
        </div>

        <ul className="space-y-2">
          {subscriptionInfo?.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-emerald-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-6 border-t border-gray-100">
        <Button
          onClick={handleManageSubscription}
          className="bg-emerald-500 hover:bg-emerald-600 transition-colors w-fit cursor-pointer "
        >
          Gerenciar assinatura
        </Button>
      </CardFooter>
    </Card>
  );
}
