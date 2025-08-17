import { PLAN_PROP } from "@/utils/permissions/canPermission";
import Link from "next/link";

interface LabelSubscriptionProps {
  expired: boolean;
  plan?: PLAN_PROP;
}

export function LabelSubscription({ expired }: LabelSubscriptionProps) {
  return (
    <div
      className="bg-red-500/90 border border-red-600 text-white text-sm md:text-base px-4 py-3 my-4 
  rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md"
    >
      <div className="space-y-1">
        {expired ? (
          <h3 className="font-semibold text-white">
            Seu plano expirou ou você não possui um plano ativo.
          </h3>
        ) : (
          <h3 className="font-semibold text-white">
            Você excedeu o limite do seu plano
          </h3>
        )}

        <p className="text-xs md:text-sm text-red-100">
          Acesse os detalhes do seu plano para continuar usando todos os
          recursos.
        </p>
      </div>

      <Link
        href="/dashboard/plans"
        className="bg-white text-red-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-red-50 transition-all w-fit"
      >
        Acessar planos
      </Link>
    </div>
  );
}
